import { useState } from 'react'

const Addtask = ({onAdd}) => {

    const [text,setText] = useState('')
    const [day,setDay] = useState('')
    const [remainder,setRemainder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text || !day) {
            alert('Please Fill All Field')
            return
        }

        onAdd({ text,day,remainder })
        setText('')
        setDay('')
        setRemainder(false)
    } 

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add task' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Date-time</label>
                <input type='date' value={day} onChange={(e) => setDay(e.target.value)} />
                
            </div>
            <div className='form-control-check'>
                <label>Remainder</label>
                <input type='checkbox' checked={remainder} onChange={(e) => setRemainder(e.currentTarget.checked)} />
            </div>
            <input className='btn btn-block' type='submit' value='Add'/>
        </form>
    )
}

export default Addtask
