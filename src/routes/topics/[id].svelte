<script context='module'>
 export async function preload({ params,  }) {
		const { id } = params;  
    return {id}
	}
</script>
<script>
  let docs
  import {app} from '../../components/config.svelte'
    import { collection, query, getFirestore, getDocs } from "firebase/firestore";
    export let id;
    import {onMount} from 'svelte'
    onMount(async() =>{
      const q = query(collection(await getFirestore(app), `subjects/${id}/topics`));
const querySnapshot = await getDocs(q);
docs = querySnapshot.docs

})
</script>

<svelte:head>
  <title>
    Topics on:{id} 
  </title>
</svelte:head>
<div class="row">
  {#if docs}
        {#each docs as doc (doc.id)}
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">{doc.id}</span>
              <p>...</p>
            </div>
            <div class="card-action">
              <a href={`topics/${id}/notes/${doc.id}`  }>View Notes</a>
             
            </div>
          </div>
        </div>
        
        {/each}
        {:else}
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
        {/if}
    </div>