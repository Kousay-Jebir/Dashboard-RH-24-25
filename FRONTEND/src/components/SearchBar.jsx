import { TextField ,InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
export default function SearchBar({placeHolder}){
    return(
        <TextField
          sx={{ maxWidth: '40%',
            '& .MuiOutlinedInput-root': {
      borderRadius: 1.5, // Customize border radius
      '& fieldset': {
        borderColor: 'neutral.light', // Customize border color
        borderWidth:2,
      },
      '&.Mui-focused fieldset': {
        borderColor: 'neutral', // Customize border color when focused
        borderWidth:2,
      },
    },
    '& .MuiInputAdornment-root': {
      color: 'purple', // Customize icon color
      borderWidth:2,
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
            style:{
                height:'43px'
            }
          }}
        />
    );
}