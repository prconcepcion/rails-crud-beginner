import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { EmployeeUpdateModal } from "../components/EmployeeUpdateModal"

const updateButtonClasses = "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-1 dark:bg-purple-600"
const deleteButtonClasses = "focus:outline-none text-white bg-red-700 hover:bg-red-800 font-small rounded-lg text-sm px-5 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
const createButtonClasses = "focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600"
const inputNameClasses = "placeholder: text-center bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"

interface Employee {
    id: number
    name: string
}

export const EmployeesPage = () => {

    const [ name, setName ] = useState<string>('')
    const [ id, setId ] = useState<number>()
    const [ data, setData ] = useState([])
    const [ open, setOpen ] = useState(false)

    const queryClient = useQueryClient();

    const onUpdate = (id:number, name:string) => {
        setOpen(true)
        setId(id)
        setName(name)
    }

    const deleteMutation = useMutation( {
        mutationKey: ['employeesDelete'],
        mutationFn: id => 
            axios.delete(`http://127.0.0.1:3000/api/employees/${id}`,).then( res =>
                res.data
        ),
        onSuccess: () => 
            queryClient.invalidateQueries({queryKey: ['employees']}),
    } )

    const createMutation = useMutation( {
        mutationKey: ['employeesCreate'],
        mutationFn: employee => 
            axios.post('http://127.0.0.1:3000/api/employees', employee).then( res =>
                res.data
        ),
        onSuccess: () => 
            queryClient.invalidateQueries({queryKey: ['employees']}),
    } )

    const { isPending, error } = useQuery( {
        queryKey: ['employeesGet'],
        queryFn: () =>
            axios.get('http://127.0.0.1:3000/api/employees').then( (res) => {
                setData(res.data)
                return res.data
        } ),
    } )

    if ( isPending  ) {
        return (
            <div>
                ...Loading Employees
            </div>
        )
    }

    if ( error  ) {
        return (
            <div>
                Error with the data
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3 flex-wrap">
                {data.map( (employee:Employee) => {
                    return (
                        <div className="box-border h-32 w-32 p-4 border-4 content-center text-center flex flex-col gap-2" key={employee.id} data-id={employee.id} >
                            {employee.name}
                            <button className={deleteButtonClasses} onClick={() => deleteMutation.mutate( employee.id )}>Delete</button>
                            <button className={updateButtonClasses} onClick={() => onUpdate(employee.id, employee.name)}>Update</button>
                        </div>
                    )
                } )}
            </div>
            {open && <EmployeeUpdateModal id={id} original_name={name} open={open} onClose={ () => setOpen(false)} />}
            <input type="text" value={name} onChange={ (event) => setName(  event.target.value ) } className={inputNameClasses} placeholder="Type in the name of the Employee" required />
            <button disabled={createMutation.isPending} className={createButtonClasses} onClick={()=>createMutation.mutate({name})} >Create Employee</button>
        </div>
    )
}