import { BlogForm } from "./components/blog-form"
import { defaultValues } from "./libs"
import { Settings } from "./components/settings"
import { HookFormProvider } from "./components/hook-form/essentials"

const App = () => {
  return (
    <div className="w-full p-10 mx-auto h-[100vh] bg-secondary-50">
      <HookFormProvider>
        <Settings />
      </HookFormProvider>
      <HookFormProvider defaultValues={defaultValues}>
        <BlogForm />
      </HookFormProvider>
    </div>
  )
}

export default App