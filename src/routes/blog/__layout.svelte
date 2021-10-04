<script>
    import {fly} from 'svelte/transition'
</script>
<div in:fly={{
    x: 400,
    y: 2,
    duration: 700,
    delay: 700
  }}
  out:fly={{ x: -400, y: 2, duration: 700 }} >
  
<slot />  

</div>
