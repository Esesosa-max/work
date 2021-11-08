<script>
    import {onMount} from 'svelte'
    import {app} from '../../components/config.svelte'
    import { collection, query, getFirestore, getDocs } from "firebase/firestore";
    let docs
    onMount(async () =>{

const q = query(collection(getFirestore(app), 'subjects'));

const querySnapshot = await getDocs(q);
docs = querySnapshot.docs

})

</script>
<svelte:head>
  <title>All Subjects</title>
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
          <a href={'topics/' + doc.id }>View Topics</a>
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