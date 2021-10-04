<script>
  export let title;
  export let body;
  export let url;
  export let id;
</script>

<div class="card">
  <div class="card-image">
    <img src={url} alt={url} />
    <span class="card-title">{title}</span>
  </div>
  <div class="card-content">
    <p>{body}.</p>
  </div>
  <div class="card-action">
    <a href="/docs/{id}" class="btn blue">Read More</a>
  </div>
</div>

<style>
  :global(.card) {
    width: 400px;
    margin: 10px;
  }
  @media (max-width: 700px) {
    :global(.card) {
      width: 300px;
      margin: 10px;
    }
  }
</style>
