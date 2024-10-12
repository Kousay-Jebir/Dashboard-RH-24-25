import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from "@mui/material";

export default function SearchBar({ placeHolder, onChange }) {
    return (
        <TextField
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5, // Customize border radius
                    '& fieldset': {
                        borderColor: 'neutral.light', // Customize border color
                        borderWidth: 2,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'neutral', // Customize border color when focused
                        borderWidth: 2,
                    },
                },
                '& .MuiInputAdornment-root': {
                    color: 'purple', // Customize icon color
                    borderWidth: 2,
                },
                '& input:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px white inset',
    },
                
            }}
            fullWidth
            size="small"
            placeholder={placeHolder}
            variant="outlined"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                style: {
                    height: '43px'
                }
            }}
            onChange={onChange} 
            
        />
    );
}
