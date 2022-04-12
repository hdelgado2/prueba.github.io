import React,{useState} from 'react';

const Listados = () => {
    const [state, setstate] = useState(0);
    return (
        <div>
            {state}
        </div>
    )
}

export default Listados
