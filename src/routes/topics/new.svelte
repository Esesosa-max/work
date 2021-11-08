<h4>Add A New Topic</h4>
<script>
import {
    setDoc,
    addDoc
} from "firebase/firestore";
import {
    v4 as uuidv4
} from 'uuid';
import {
    onMount,
} from "svelte";
import {
    getStorage,
} from "firebase/storage";
import {
    app
} from "../../components/config.svelte";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    doc
} from "@firebase/firestore";

const storage = getStorage(app);
let newTopicText
let pork = 'Choose Catergory'
let docs
let subjectTopic



onMount(() => {

    M.AutoInit();
    getSubjects()
})

const getSubjects = async () => {
    const q = query(collection(getFirestore(app), 'subjects'));
    const querySnapshot = await getDocs(q);
    docs = querySnapshot.docs
}

const handleSubmit = async e => {
    e.preventDefault();
    await setDoc(doc(getFirestore(app), `subjects/${subjectTopic}/topics/`, newTopicText), {
                   
                    });

    // Add a new document with a generated id.

}
</script>
<form on:submit="{handleSubmit}" >
    <div class="row">
        
        <div class="input-field col s12">
    
  
        <select class="browser-default" bind:value="{subjectTopic}">
            <option selected>Choose Catergory</option>
            {#if docs}
              {#each docs as doc (doc.id)}
                <option value={doc.id}>{doc.id}</option>
              {/each}
            {:else}
              <p>Loading....</p>
            {/if}
          </select>

  </div>

  <div class="input-field col s12">
<input type="text" bind:value={newTopicText} >

</div>

     
</div>

    <button type="submit" class="btn blue darken-2">Submit</button>
 
 
  
  </form>
