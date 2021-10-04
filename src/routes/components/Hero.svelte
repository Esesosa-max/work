<header class=" lighten-2 h">
  <div class="container">
    <h4 class="m-0 center-align">Let's Plans it For You</h4>
    <p class="flow-text">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores
      labore, expedita suscipit quas qui quam iusto, amet ut ipsam doloremque
      illo eveniet quibusdam illum dicta.
    </p>

    <button
      class="btn blue"
      on:click={() => window.open("mailto:info@kptplans.com")}
      >Contact Us</button
    >
  </div>
</header>

<style>
  header {
    height: 500px;
    color: #fff;
    background: url(img/hero.jpg);
    background-size: cover;
    background-position: center;
  }
  .m-0 {
    margin: 0;
  }
  .flow-text {
    background-color: rgb(87, 87, 240);
    padding: 20px;
  }
</style>
