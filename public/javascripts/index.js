// let jrnlDiv = $('#journal');
// let publishBTN = $('#publishBTN');

// import { drop } from "lodash";

// publishBTN.click(() => {
//     let jrnl = document.createElement(div);
//     jrnl.className = "jrnl";
//     jrnl.innerHTML = `
//     <h2><%= title %></h2>
//     <p><%= intro %></p>`
    
//     // </div>;
//     // <div class="jrnl">
//     jrnlDiv.append(jrnl);
//     console.log(jrnlDiv)
// })

const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
// Buttons
const optionBTN = document.querySelector('#option-btn');
const dropDown = document.querySelector('#drop-menu');

optionBTN.addEventListener('click', (e) => {
    e.stopPropagation();
    dropDown.classList.add('show');
})
document.addEventListener('click', (e) => {
    if (!dropDown.contains(e.target)) {
      dropDown.classList.remove('show');
    }   
});

imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    
    if (file) {
        // Revoke the previous URL if it exists
        if (imagePreview.style.backgroundImage) {
            URL.revokeObjectURL(imagePreview.style.backgroundImage.slice(5, -2));
        }
        
        // Create and set the new URL
        const url = URL.createObjectURL(file);
        imagePreview.style.backgroundImage = `url(${url})`;
        imagePreview.style.backgroundSize = 'cover';
        imagePreview.style.backgroundPosition = 'center';
    }
});

// `ALorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis similique temporibus officiis? Adipisci, non. Modi consectetur cum beatae at dicta quibusdam odit commodi numquam officia impedit ratione maiores tempore necessitatibus nulla nihil porro quam exercitationem architecto delectus esse, aliquid itaque quod. Necessitatibus saepe, veritatis accusamus incidunt et atque itaque minus voluptates, possimus quasi deleniti quam aut amet illum aspernatur ea accusantium facilis numquam suscipit velit sed quas temporibus vel illo. Blanditiis maxime quidem nam? Aspernatur maiores fugit beatae commodi dignissimos, eveniet reiciendis at deleniti odit quisquam quas sunt dolor quasi repellendus provident facilis amet? Dolore suscipit,<br><br> cupiditate maiores eaque officia voluptates quae labore, consequatur adipisci unde vitae libero quod corporis blanditiis quisquam recusandae alias aut dolorum eum autem corrupti. Nobis? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis sunt molestiae nulla amet ut quam omnis repellat dicta dolorem, ex numquam ab nihil recusandae facere vitae rerum doloremque, itaque, quidem fugit? Reprehenderit illo rem esse vitae consequatur delectus architecto eaque quasi, debitis inventore hic voluptas sint deleniti eligendi tempore reiciendis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta voluptates incidunt ullam ipsa natus ad atque quis assumenda vero at! Voluptatem perferendis illum atque, et ipsa maiores ipsum fugiat modi! Quam, consectetur nesciunt totam dolorem deserunt accusantium accusamus temporibus sequi necessitatibus mollitia quasi a dolorum perspiciatis sapiente quis, voluptatem eius. <br><br>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero reiciendis accusantium optio vitae ad animi molestias neque explicabo aspernatur. Enim autem repudiandae eaque eum placeat nam vero aspernatur, similique nostrum quibusdam nihil error perspiciatis harum accusantium saepe. Eligendi a consequuntur rem placeat temporibus iste quidem vero recusandae, exercitationem ratione deserunt eum nulla, ad reprehenderit accusantium qui libero? Ipsa cumque voluptates quidem incidunt itaque non explicabo fugiat possimus ducimus quae eveniet, voluptate aut adipisci minus eaque? Tenetur, harum mollitia ex iste, libero dicta ipsa eveniet quo earum dolore fugiat deleniti. Hic laudantium fugit atque quos, deleniti, maxime architecto quam quasi iusto, officiis labore eos error? Consequatur ducimus distinctio omnis ab quibusdam in maxime eligendi quasi itaque necessitatibus laborum, odit amet blanditiis.`