import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    sets: { mdi }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#6366F1',
          secondary: '#8B5CF6',
          accent: '#F59E0B',
          error: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
          success: '#10B981'
        }
      }
    }
  }
})