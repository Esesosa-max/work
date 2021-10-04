
<script>
    export let current = 'BP'
$:console.log(current)
</script>
<div>

{#if current === 'BP'}
    <div class='container-lg'>
        <div class='row'>
            <h3>Benefits of business Plan</h3>
            <div class='col m12 l6'>
               <p> <b>=></b> Lorem ipsum dolor sit amet consectetur,
                 adipisicing elit. Consequuntur repellendus fugiat facere quo quam, magni molestiae, 
                cum optio sunt sapiente itaque quidem molestias iusto voluptatem consequatur
                 quod maiores est animi.</p>
            </div>
            <div class='col m12 l6'>
                <p> <b>=></b> Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Consequuntur repellendus fugiat facere quo quam, magni molestiae, 
                 cum optio sunt sapiente itaque quidem molestias iusto voluptatem consequatur
                  quod maiores est animi.
             </div>
        </div>
        <div class='row'>
         
            <div class='col m12 l6'>
               <p> <b>=></b> Lorem ipsum dolor sit amet consectetur,
                 adipisicing elit. Consequuntur repellendus fugiat facere quo quam, magni molestiae, 
                cum optio sunt sapiente itaque quidem molestias iusto voluptatem consequatur
                 quod maiores est animi.</p>
            </div>
            <div class='col m12 l6'>
                <p> <b>=></b> Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Consequuntur repellendus fugiat facere quo quam, magni molestiae, 
                 cum optio sunt sapiente itaque quidem molestias iusto voluptatem consequatur
                  quod maiores est animi.</p>
             </div>
        </div>
    </div>

    {:else if current == 'BPW'}
    <div class='container-lg'>
        <div class='row'>
            <h3>Business Prospal Writing</h3>
            <div class='col m12 l6'>
               <p> <b>=></b> Lorem ipsum dolor sit amet consectetur,
                 adipisicing elit. Consequuntur repellendus fugiat facere quo quam, magni molestiae, 
                cum optio sunt sapiente itaque quidem molestias iusto voluptatem consequatur
                 quod maiores est animi.</p>
            </div>
            <div class='col m12 l6'>
                <p> <b>=></b> Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Consequuntur repellendus fugiat facere quo quam, magni molestiae, 
                 cum optio sunt sapiente itaque quidem molestias iusto voluptatem consequatur
                  quod maiores est animi.
             </div>
        </div>
        <div class='row'>
         
            <div class='col m12 l6'>
               <p> <b>=></b> Lorem ipsum dolor sit amet consectetur,
                 adipisicing elit. Consequuntur repellendus fugiat facere quo quam, magni molestiae, 
                cum optio sunt sapiente itaque quidem molestias iusto voluptatem consequatur
                 quod maiores est animi.</p>
            </div>
            <div class='col m12 l6'>
                <p> <b>=></b> Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Consequuntur repellendus fugiat facere quo quam, magni molestiae, 
                 cum optio sunt sapiente itaque quidem molestias iusto voluptatem consequatur
                  quod maiores est animi.</p>
             </div>
        </div>
    </div>
{/if}
</div>