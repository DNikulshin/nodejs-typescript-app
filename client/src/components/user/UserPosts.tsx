import { ChangeEvent, FormEventHandler, useState } from "react"
import { Button } from "../ui/button"

export const UserPosts = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setTitle(e.target.value)
        //-----logic--------------

        setTitle('')

    }


    const changeDescriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)

        //-------logic------------

        setDescription('')
    }


    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (!title.trim() && !description.trim()) return

        //-------logic------------

    }

    return (
        <div className="flex flex-col gap-3 items-center">
            <h3>UserPosts</h3>

            <form className="flex flex-col gap-3 items-center" onSubmit={onSubmit}>
                <label>
                    <input className="bg-gray-200 mb-2 px-2 py-2 shadow-md" type="text" placeholder="title" value={title} onChange={changeTitleHandler} />
                </label>
                <textarea className="bg-gray-200 w-full min-w-80 min-h-28 px-2 py-2" placeholder="Enter description" value={description} onChange={changeDescriptionHandler} />
                <Button>Add</Button>
            </form>
        </div>
    )
}
