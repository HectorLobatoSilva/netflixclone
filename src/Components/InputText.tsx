import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

interface Input {
    type: string;
    setOnChange: (event:React.ChangeEvent<HTMLInputElement>) => any;
    placeholder: string;
    value: string;
    name: string;
    required?: boolean;
}

const useStyle = makeStyles({
    formElement: {
        margin: "1em"
    },
    root: {
        color: "#FFFFFF",
        '& fieldset': {
            borderColor: '#9B9393'
        },
        '&$focused $notchedOutline': {
            borderColor: '#FFFFFF',
        },
        '&:hover $notchedOutline': {
            borderColor: '#FFFFFF'
        },
    },
    rootLabel :{
        color: "#E2DDDD",
        "&.MuiFormLabel-root.Mui-focused":{
            color: "#FFFFFF"
        }
    },
    focused: {},
    notchedOutline: {},
})

const InputText: FunctionComponent<Input> = ({type, placeholder, setOnChange, value, name, required = true}) => {
    const classes = useStyle()
    return (
        <TextField
            required = {required}
            value = {value}
            name ={name}
            fullWidth 
            placeholder = {placeholder} 
            type = {type} 
            variant = "outlined" 
            InputLabelProps={{ 
                shrink: true,
                classes: {
                    root: classes.rootLabel,
                },
            }} 
            label = {placeholder} 
            className = { classes.formElement }
            InputProps={{
                classes: {
                    root: classes.root,
                    focused: classes.focused,
                    notchedOutline: classes.notchedOutline
                },
            }}
            onChange={setOnChange}
        />
    )
}

export default InputText