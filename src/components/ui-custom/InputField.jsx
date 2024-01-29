import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";


const InputField = ({form,name,placeholder,type,level, style, levelStyle}) => {
    
  return (
      <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
              <FormItem>
                  {level && <FormLabel className={levelStyle}>{level}</FormLabel>}
                  <FormControl>
                      <Input placeholder={placeholder} type={type} value={name || ''}  {...field} className={style}/>
                  </FormControl>
                  <FormMessage />
              </FormItem>
          )}
      />
  );
};

export default InputField;
