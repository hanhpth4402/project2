import './Home.scss';
import { ToastContainer } from 'react-toastify';


function Home () {
    
    return (
        <>
<main class="container py-5">
  <h1>Bootstrap and Masonry</h1>
  <p class="lead">Integrate <a href="https://masonry.desandro.com/">Masonry</a> with the Bootstrap grid system and  s component.</p>

  <p>Masonry is not included in Bootstrap. Add it by including the JavaScript plugin manually, or using a CDN like so:</p>

  <pre><code>
&lt;script src=&quot;https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js&quot; integrity=&quot;sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D&quot; crossorigin=&quot;anonymous&quot; async&gt;&lt;/script&gt;
  </code></pre>

  {/* <p>By adding <code>data-masonry='{"percentPosition": true }'</code> to the <code>.row</code> wrapper, we can combine the powers of Bootstrap's responsive grid and Masonry's positioning.</p> */}

  <hr class="my-5"/>

  <div class="row" data-masonry='{"percentPosition": true }'>
    <div class="col-sm-6 col-lg-4 mb-4">
      <div class=" ">
        <svg class="bd-placeholder-img  -img-top" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
        <div class=" -body">
          <h5 class=" -title">  title that wraps to a new line</h5>
          <p class=" -text">This is a longer   with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4 mb-4">
      <div class="  p-3">
        <figure class="p-3 mb-0">
          <blockquote class="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption class="blockquote-footer mb-0 text-body-secondary">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4 mb-4">
      <div class=" ">
        <svg class="bd-placeholder-img  -img-top" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
        <div class=" -body">
          <h5 class=" -title">  title</h5>
          <p class=" -text">This   has supporting text below as a natural lead-in to additional content.</p>
          <p class=" -text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4 mb-4">
      <div class="  text-bg-primary text-center p-3">
        <figure class="mb-0">
          <blockquote class="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption class="blockquote-footer mb-0 text-white">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4 mb-4">
      <div class="  text-center">
        <div class=" -body">
          <h5 class=" -title">  title</h5>
          <p class=" -text">This   has a regular title and short paragraph of text below it.</p>
          <p class=" -text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4 mb-4">
      <div class=" ">
        <svg class="bd-placeholder-img  -img" width="100%" height="260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder:   image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">  image</text></svg>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4 mb-4">
      <div class="  p-3 text-end">
        <figure class="mb-0">
          <blockquote class="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption class="blockquote-footer mb-0 text-body-secondary">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4 mb-4">
      <div class=" ">
        <div class=" -body">
          <h5 class=" -title">  title</h5>
          <p class=" -text">This is another   with title and supporting text below. This   has some additional content to make it slightly taller overall.</p>
          <p class=" -text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>

</main>



<ToastContainer
                position="top-left"
                autoClose={500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                backdrop="static"
                keyboard={false}        
            />          
        </>
    )
}

export default Home;