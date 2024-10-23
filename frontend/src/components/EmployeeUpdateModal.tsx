import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

const inputNameClasses = "placeholder: text-center bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-9/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
const createButtonClasses = "focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600"

export const EmployeeUpdateModal = ({original_name, open, onClose, id}) => {
    const [ name, setName ] = useState(original_name || '')
    const queryClient = useQueryClient();

    const updateMutation = useMutation( {
        mutationKey: ['employeesUpdate'],
        mutationFn: ({id, name}) => 
            axios.put(`http://127.0.0.1:3000/api/employees/${id}`, {employee:{name}}).then( res =>
                res.data
        ),
        onSuccess: () => {
            onClose()
            queryClient.invalidateQueries({queryKey: ['employees']})
        }
            ,
    } )

    return (
        <div 
            className={`fixed inset-0 flex justify-center items-center transition-colors ${ open ? "visible bg-black/20" : "invisible" }`}
            onClick={(onClose)}
        >
            <div 
                className={`text-center flex flex-col gap-6 justify-center items-center w-96 h-56 bg-white rounded-xl shadow p-6 m-6 transition-all ${ open ? "scale-100 opacity-100" : "scale-125 opacity-0" }`}
                onClick={e=>e.stopPropagation()}
            >
                <button 
                    className="absolute top-6 right-6" 
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-red-500" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                    </svg>
                </button>
                <input type="text" value={name} onChange={ (event) => setName(  event.target.value ) } className={inputNameClasses} placeholder={original_name} required />
                <button disabled={updateMutation.isPending} onClick={() => updateMutation.mutate({id, name})} className={createButtonClasses}> Update </button>
            </div>
        </div>
    )
}