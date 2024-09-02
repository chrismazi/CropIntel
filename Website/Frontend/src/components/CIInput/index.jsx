import { useRef, useState } from 'react';
import './index.css'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

export default function CIInput({
    name,
    MuiIcon=null,
    type="text",
    placeholder='',
    iconStyles={},
    inputStyle={},
    className='',
    onSend = () => null,
    onChange = () => null
}) {
    
    const [appearText, setAppearText] = useState(false);

    const ref = useRef(0);

    function setType() {
        if(type === 'password') return appearText ? 'text' : 'password';
        if(type === 'message') return 'text'
        
        return type;
    }
    return (
        <div className={"ciinput " + className} onClick={e => ref.current.focus()}>
            {
                MuiIcon ?
                <MuiIcon style={iconStyles} className='icon' />
                :
                null
            }

            <input 
                style={inputStyle}
                type={setType()} 
                placeholder={placeholder}
                onChange={onChange}
                ref={ref}
                name={name}
            />

            {
                type === 'password' ?
                    <div className='visibility-icon'>
                        {
                            appearText ?
                                <VisibilityOutlinedIcon style={iconStyles} onClick={e => setAppearText(false)}/>
                            :
                                <VisibilityOffOutlinedIcon style={iconStyles} onClick={e => setAppearText(true)}/>
                        }
                    </div>
                :
                null
            }

            {
                type === 'message' ?
                    <div className='visibility-icon'>
                        <SendOutlinedIcon onClick={e => {
                            onSend({
                                text: ref.current.value,
                                type: 'text'
                            });
                            
                            ref.current.value = '';
                        }} />
                    </div>
                :
                null
            }
        </div>
    );
}