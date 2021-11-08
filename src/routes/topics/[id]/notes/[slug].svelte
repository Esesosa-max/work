<script context='module'>
    export async function preload({ params,  }) {
           const { id,slug } = params;
   return {id,slug}
   
       }
   </script>

   <script>
     let docs
       import { collection, query, getFirestore, getDocs,orderBy } from "firebase/firestore";
import { app } from "../../../../components/config.svelte";
import {onMount} from 'svelte'
       export let id
       export let slug
       onMount(async () => {
        const q = query(collection(getFirestore(app) ,`subjects/${id}/topics/${slug}/notes` ), orderBy("date"))
        const querySnapshot = await getDocs(q);
docs = querySnapshot.docs

       })
   </script>
   <svelte:head>
    <title>
     Notes: Topic {slug}
    </title>
  </svelte:head>
   <h6>Notes on :{id}:{slug}</h6>
   <div class="row">
 {#if docs}
   {#each docs as doc , i(doc.id)}
   <div class="col s12 m6">
    <div class="card">
      <div class="card-image">





        <img src={doc.data().image}  alt='page 1'/>
        <span class="card-title">Page:{i + 1}</span>
       
      </div>
      <div class="card-content">

        <a class="btn-floating halfway-fab waves-effect waves-light red" href={doc.data().image} download='my-flie' ><i class="material-icons">download</i>
        
        </a>
        <p>Uploaded on :{doc.data().date}</p>
        <p>Uploaded By :{doc.data().username}</p>
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