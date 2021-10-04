<script>
  import { onMount } from "svelte";

  import { fade, fly } from "svelte/transition";
  import Benefits from "./Benefits.svelte";
  onMount(() => M.AutoInit());
  let arr = ["BP", "BPW", "AC"];
  let index = 0;
  $: active = arr[index];
</script>

<div class="container-lg" >
  <div class="row">
    <div class="col s12">
      <ul class="tabs">
        <li class="tab col s3">
          <a class="active" href="#test1" on:click={() => (index = 0)}
            >Business Propsal</a
          >
        </li>
        <li class="tab col s3">
          <a href="#test2" on:click={() => (index = 1)}
            >Business Propsal Writing</a
          >
        </li>
        <li class="tab col s3">
          <a href="#test3" on:click={() => (index = 2)}>Accounting</a>
        </li>
      </ul>
    </div>
    <div id="test1" class="col s12 bs-plan mt-3 ">
      <div class="">
        <div class="col m6 l5">
          <h4 class="pb-7 text-3xl">Business Plan Preparation</h4>
          <p>
            A well-written business plan is an important tool because it gives
            entrepreneurs the ability to lay out their goals and track their
            progress as their business begins to grow.
          </p>
          <p>
            We help buisnesses to prepare their buisness plans across many
            business sectors of the market.
          </p>
        </div>

        <div transition:fade class="col l6 ">
          <img
            alt="illustration of a financial chart"
            src="img/img1.png"
            class=""
          />
        </div>
      </div>
    </div>
    <div id="test2" class="col s12 bs-plan mt-3 ">
      <div
        in:fly={{
          x: 100,
          y: 2,
          duration: 700,
          delay: 700,
        }}
        out:fly={{ x: -100, y: 2, duration: 700 }}
        class=""
      >
        <div class="col m6 l5">
          <h4 class="pb-7 text-3xl">Business Prospal Writing</h4>
          <p>
            A well-written business plan is an important tool because it gives
            entrepreneurs the ability to lay out their goals and track their
            progress as their business begins to grow.
          </p>
          <p>
            We help buisnesses to prepare their buisness plans across many
            business sectors of the market.
          </p>
        </div>

        <div transition:fade class="col l6 ">
          <img
            alt="illustration of a financial chart"
            src="img/img2.png"
            class=""
          />
        </div>
      </div>
    </div>
    <div id="test3" class="col s12 bs-plan mt-3 ">
      <div
        in:fly={{
          x: 100,
          y: 2,
          duration: 700,
          delay: 700,
        }}
        out:fly={{ x: -100, y: 2, duration: 700 }}
        class=""
      >
        <div class="col m6 l5">
          <h4 class="pb-7 text-3xl">Accounting</h4>
          <p>
            A well-written business plan is an important tool because it gives
            entrepreneurs the ability to lay out their goals and track their
            progress as their business begins to grow.
          </p>
          <p>
            We help buisnesses to prepare their buisness plans across many
            business sectors of the market.
          </p>
        </div>

        <div transition:fade class="col l6 ">
          <img
            alt="illustration of a financial chart"
            src="img/img3.png"
            class=""
          />
        </div>
      </div>
    </div>
  </div>
</div>
<Benefits current={active} />

<style>
  img {
    max-width: 100%;
  }
  :global(.container-lg) {
    max-width: 1200px;
    margin: 0 auto;
  }
  .mt-3 {
    margin-top: 20px;
  }
  .tabs .tab,
  a {
    background-color: transparent;
    color: #5d705f;
    text-transform: initial;
  }
  :global(.tabs .indicator) {
    background-color: #3172cd;
  }
  .tabs .tab a:hover,
  .tabs .tab a.active {
    background-color: transparent;
    color: #717a71;
  }
</style>
