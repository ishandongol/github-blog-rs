import { MDXEditor } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings'
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar'
import { quotePlugin } from '@mdxeditor/editor/plugins/quote'
import { listsPlugin } from '@mdxeditor/editor/plugins/lists'
import { linkPlugin } from '@mdxeditor/editor/plugins/link'
import { linkDialogPlugin } from '@mdxeditor/editor/plugins/link-dialog'
import { tablePlugin } from '@mdxeditor/editor/plugins/table'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { CodeToggle } from '@mdxeditor/editor/plugins/toolbar/components/CodeToggle'
import { InsertTable } from '@mdxeditor/editor/plugins/toolbar/components/InsertTable'
import { CreateLink } from '@mdxeditor/editor/plugins/toolbar/components/CreateLink'
import { ListsToggle } from '@mdxeditor/editor/plugins/toolbar/components/ListsToggle'
import { BlockTypeSelect } from '@mdxeditor/editor/plugins/toolbar/components/BlockTypeSelect'

export const TextEditor = () => {
    return (
        <MDXEditor
            className=' bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-primary-500 focus:ring-primary-500 focus:ring-1 '
            markdown='# Hello world'
            plugins={[toolbarPlugin({
                toolbarContents: () => (<><UndoRedo /><BlockTypeSelect /><BoldItalicUnderlineToggles /><CodeToggle /><InsertTable /><CreateLink /><ListsToggle /></>)
            }), headingsPlugin(), quotePlugin(), listsPlugin(), linkPlugin(), linkDialogPlugin(), tablePlugin()]} />
    )
}