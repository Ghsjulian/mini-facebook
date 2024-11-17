


export  const useValid = (value)=>{
    let arr = ["<",">","/","<script>"]
    if(!arr.includes(value.trim())){
        return value.trim()
    }
}