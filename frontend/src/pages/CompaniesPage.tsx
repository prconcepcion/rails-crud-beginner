import { useParams } from "react-router-dom"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"

export const CompaniesPage = () => {
    const [ data, setData ] = useState([])


    const { isPending, error } = useQuery( {
        queryKey: ['employeesGet'],
        queryFn: () =>
            axios.get('http://127.0.0.1:3000/api/companies').then( (res) => {
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

    console.log(data)

    return (
        <div className="flex flex-row gap-3 flex-wrap">
            {data.map( (company, companyIndex) => (
                <div className="box-border h-auto w-32 p-4 border-4 content-center text-center flex flex-col gap-2">
                    <Link to={`daspodsa`}>{company.name}</Link>
                    { company.projects.map( ( project, projectIndex ) => (
                    <div>
                        { project }
                    </div>
                ) ) }
                </div>

            ) )}
        </div>
    )
}