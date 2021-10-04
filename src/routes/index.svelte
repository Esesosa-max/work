<script>
  import Features from "./components/Features.svelte";
  import { fade, fly } from "svelte/transition";
  import Hero from "./components/Hero.svelte";
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
    integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
</svelte:head>

<div>
  <Hero />
  <Features />
</div>

<div class="row">
  <h4 class="center-align">Do Not Take Our Word For It</h4>
  <div class="col s12 l4 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">Card Title</span>
        <p>
          I am a very simple card. I am good at containing small bits of
          information. I am convenient because I require little markup to use
          effectively.
        </p>
      </div>
      <div class="card-action">
        <button
          href="#"
          class="center-align btn blue"
          on:click={() => window.open("mailto:info@kptplans.com")}
          >Contact US</button
        >
      </div>
    </div>
  </div>
  <div class="col s12 l4 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">Card Title</span>
        <p>
          I am a very simple card. I am good at containing small bits of
          information. I am convenient because I require little markup to use
          effectively.
        </p>
      </div>
      <div class="card-action">
        <button href="#" class="center-align btn blue"
        on:click={() => window.open("mailto:info@kptplans.com")}
        >Contact US</button>
      </div>
    </div>
  </div>
  <div class="col s12 l4 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">Card Title</span>
        <p>
          I am a very simple card. I am good at containing small bits of
          information. I am convenient because I require little markup to use
          effectively.
        </p>
      </div>
      <div class="card-action">
        <button class="center-align btn blue"
        on:click={() => window.open("mailto:info@kptplans.com")}
        >Contact US</button>
      </div>
    </div>
  </div>
</div>

<section class="accordion-container container">
  <h4 class="center-align">Frequetly Asked Questions (FAQ)</h4>
  <ul class="collapsible">
    <li>
      <div class="collapsible-header">
        <i class="fa fa-contact" />How Do I Get Started
      </div>
      <div class="collapsible-body">
        <span>Lorem ipsum dolor sit amet.</span>
      </div>
    </li>
    <li>
      <div class="collapsible-header">
        <i class:material-icons={true} />Is There A Way To Contact us
      </div>
      <div class="collapsible-body">
        <span>Lorem ipsum dolor sit amet.</span>
      </div>
    </li>
  </ul>
</section>
<section class=" blue darken-2 ">
  <div class="container py-3 center-align ">
    <h4 class="text-white">Stay Up To Date</h4>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ut
      eligendi a, debitis voluptates officiis ratione animi non nemo eius?
    </p>
  </div>
</section>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");
  * {
    font-family: "Poppins", sans-serif;
  }
  :global(.py-3) {
    padding: 3rem 2rem;
  }
</style>
