import { BlogForm } from "./components/blog-form"
import { defaultValues } from "./libs"
import { SettingsView } from "./components/settings-view"
import { HookFormProvider } from "./components/hook-form/essentials"
import { useRootContext } from "./components/context"

const App = () => {
  const { settings, getSettings
  } = useRootContext()
  const { categories, authors } = settings
  return (
    <div className="w-full py-20">
      <HookFormProvider defaultValues={{ categories, authors }}>
        <SettingsView getSettings={getSettings} settings={settings} />
      </HookFormProvider>
      <HookFormProvider defaultValues={defaultValues}>
        <BlogForm settings={settings} />
      </HookFormProvider>
    </div>
  )
}

export default App