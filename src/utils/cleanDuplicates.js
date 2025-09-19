import { supabase } from '@/lib/supabase'

export const cleanDuplicateData = async () => {
  const results = {}
  const errors = []

  // Função para remover duplicatas de uma tabela
  const removeDuplicates = async (tableName) => {
    try {
      // Buscar todos os registros
      const { data: allRecords, error: fetchError } = await supabase
        .from(tableName)
        .select('*')
        .order('id')

      if (fetchError) throw fetchError

      // Agrupar por nome para encontrar duplicatas
      const grouped = {}
      allRecords.forEach(record => {
        if (!grouped[record.name]) {
          grouped[record.name] = []
        }
        grouped[record.name].push(record)
      })

      // Identificar duplicatas (manter o primeiro, remover os outros)
      const toDelete = []
      const updates = []
      
      Object.values(grouped).forEach(group => {
        if (group.length > 1) {
          const keepRecord = group[0] // Manter o primeiro
          const duplicates = group.slice(1) // Remover os outros
          
          // Preparar atualizações das referências
          duplicates.forEach(duplicate => {
            updates.push({
              oldId: duplicate.id,
              newId: keepRecord.id
            })
          })
          
          toDelete.push(...duplicates)
        }
      })

      if (toDelete.length > 0) {
        // Atualizar referências na tabela content_items
        const columnName = `${tableName.slice(0, -1)}_id` // pillars -> pillar_id
        
        for (const update of updates) {
          await supabase
            .from('content_items')
            .update({ [columnName]: update.newId })
            .eq(columnName, update.oldId)
        }

        // Agora remover duplicatas
        const idsToDelete = toDelete.map(record => record.id)
        const { error: deleteError } = await supabase
          .from(tableName)
          .delete()
          .in('id', idsToDelete)

        if (deleteError) throw deleteError

        results[tableName] = `${toDelete.length} duplicatas removidas`
      } else {
        results[tableName] = 'nenhuma duplicata encontrada'
      }

    } catch (error) {
      errors.push(`${tableName}: ${error.message}`)
      results[tableName] = 'erro'
    }
  }

  // Limpar duplicatas de cada tabela
  await removeDuplicates('pillars')
  await removeDuplicates('angles')
  await removeDuplicates('formats')
  
  // Moldes com tratamento especial
  try {
    await removeDuplicates('molds')
  } catch (error) {
    errors.push(`molds: ${error.message}`)
    results.molds = 'tabela pode não existir'
  }

  console.log('Limpeza concluída:', results)
  if (errors.length > 0) {
    console.log('Erros:', errors)
  }

  return {
    success: errors.length === 0,
    results,
    errors
  }
}