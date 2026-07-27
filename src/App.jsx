import Globe from "./components/Globe";
import "./App.css";


function App(){

return (

<div className="page">


<header>

<h1>INDUSLAB</h1>


<nav>
<span>INICIO</span>
<span>SOBRE</span>
<span>CONTATO</span>
</nav>


<button>
MENU
</button>


</header>



<section className="hero">


<div className="card">


<p>INDUSLAB</p>


<h2> Onde houver uma unidade Induslab, há a força do grupo inteiro</h2>

<div className="places">

<div>
Induslab - Paraná
<strong>BRASIL</strong>
</div>

<div>
Induslab - Bahia
<strong>BRASIL</strong>
</div>

<div>
Induslab - São Paulo
<strong>BRASIL</strong>
</div>

<div>
Induslab - Pernambuco
<strong>BRASIL</strong>
</div>

<div>
Induslab - Ceará
<strong>BRASIL</strong>
</div>

<div>
Induslab - Flórida
<strong>ESTADOS UNIDOS</strong>
</div>


</div>


</div>



<div className="globe-area">

<Globe/>

</div>



</section>


</div>


)

}


export default App;