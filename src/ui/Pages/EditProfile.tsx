import { useEffect, useState } from 'react'
import { useFetchUser } from "../../infrastructure/API/queries/useFetchUser"
import { useNavigate } from 'react-router'
import { useUpdateUser } from '../../infrastructure/API/mutations/useUpdateUser'
import { deepEqual } from 'assert'

export type TUser = { 
    username?:string,
    firstName?: string,
    lastName?: string,
    birthDate?: string,
    email?:string,
    age?: number,
}

export const EditProfil = () => {
    const navigate = useNavigate()

    const currUser = localStorage.getItem('user')
    const { data:user, refetch, isFetched } = useFetchUser('user', `${currUser}`)

    const [details, setDetails] = useState<TUser | null >(null)

    useEffect(() => {
        refetch()

        isFetched ? setDetails(user?.data) : setDetails(null)
    },[isFetched])

    const { mutate } = useUpdateUser({key:'userUpdate', url:`https://dummyjson.com/users/${currUser}`, body:details})

    const handleChange = (e:any) => {
        setDetails((prevDetails):any => {
            return {
            ...prevDetails,
            [e.target.name] : e.target.value
            }
        })
    }

    if(!isFetched){
        return <h2>Loading...</h2>
    }

    return (
        <section className='margins'>
            <h2 style={{marginTop:'1rem'}}>🔧Profile Settings</h2>
            <div className="profile-info-edit">
                <div>
                    <label htmlFor="username">Username</label>
                    <input name='username' type="text" value={details?.username || ''} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input name='email' type="text" value={details?.email  || ''} onChange={handleChange} />
                </div>
                <div style={{ gridColumn:'1/-1' }}>
                    <label htmlFor="firstName">Name</label>
                    <input name='firstName' type="text" value={details?.firstName  || ''} onChange={handleChange} />    
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input name='lastName' type="text" value={details?.lastName  || ''} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input name='age' type='number' min={0} value={details?.age  || ''} onChange={handleChange} />
                </div>
                <div style={{display:'flex', flexDirection:'row', gridColumn:'1/-1', gap:'.5rem', alignItems:'center', justifyContent:'center', marginTop:'.5rem'}}>
                    {<button onClick={() => mutate()}>Update profile &nbsp;🌟</button>}
                    <button onClick={() => navigate(`/profile/${currUser}`)}>Cancel changes &nbsp; ✖</button>
                </div>
            </div>
        </section>
    )
}