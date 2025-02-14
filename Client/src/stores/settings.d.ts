declare module '@/stores/settings' {
	import { Ref } from 'vue'

	export interface SettingsStore {
		darkMode: Ref<string>
		toggleDarkMode: () => void
	}

	export const useSettingsStore: () => SettingsStore
}