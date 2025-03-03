# FlashCLI 
#### This is a project I had made for my OCR A Level Computer Science Non-Exam-Assessment.
#### In this file I'll be going through the issues I've had in this files creation and also what went well (WWW and EBI), my future plans for this project and how it can be installed and used.


## Table of Contents

* [Requirements](#requirements)
* [How to Run the program](#how-to-run-the-program)
* [About the project itself](#about-the-project-itself)
    * [What is Terrain Generation?](#what-is-terrain-generation)
* [WWW (What went well)](#www-what-went-well)
* [Issues + Further Developments](#issues-further-developmentfuture-plans)
    * [Future Plans](#future-plans)
* [References Used](#references-used)



## Requirements
Install [Node.js](https://nodejs.org/en)



## How to Run the program
Clone the repository:
```
git clone https://github.com/MuyuluKaja/Terrain-Generator.git
```

Open Repository:
```
cd Terrain-Generator
```

Install prerequisites:
```
npm install
```

Run file:
```
npm run dev
```

## About The Project itself
This project was made for my [A Level Computer Science Non-Exam-Assessment for the OCR Exam Board](https://www.ocr.org.uk/images/170844-specification-accredited-a-level-gce-computer-science-h446.pdf) which is worth 20% of my grade. This project is marked out of 70 and the coding section is of the Development Stage worth 25 of the 70 marks. This project aims to generate various forms of terrains using different noise algorithms, as well as generating different biomes and characteristics of a landform.

### What is Terrain Generation? 
Terrain Generation is the process of creating landscapes in virtual space for simulations. In this case I used procedural generation where I used multiple different algorithms to generate terrains and represent natural landforms.


## Issues + (Further Development/Future Plans)

### Future Plans
What currently works is the terrain generation aspect of the project, I found that the ridge and fractal noise
algorithm works well. However, if there were more time I would have developed the simplex algorithm even
more as well as adding other noise algorithms like value noise, worley noise etc. Another way I could
develop noise generation is to add seeding, which means, given a specific ‘seed’ (code), the same terrain
could be generated.
Looking back at my stakeholder’s suggestions and reviews, adding and developing the sky textures and also
adding objects like trees, or simulating volcanic erruption and rainfall would further enhance that realism
and accuracy aspect to the project so that it could also be applied to scenarios outside of education, such
as video game terrain generation. Another suggestion she had made was to add a first person view of the
terrain. To further build upon that, I came up with the idea of adding a ‘flight mode’ in which the user can
traverse the terrain using typical WASD game controls, this will also make the process of analysing the terrain
even easier. On the topic of analysing the terrain, what I had missed out on, which I would have added
given there was more time, was adding educational tools such as distance or slope calculations, or another
idea would to add a statistics feature in which the terrain generation history is stored with the stats about the
generated terrain as well as the seed so it can be compared with preceeding or proceeding generations
which would be useful for educational situations.
Another thing I could develop is the explanation of the controls since some people may not know what
segments are, or I could explain that in the GitHub README file. I could add a button that would explain
what the different parameters do and what the noise algorithm do. Making the installation process simpler
by making this into an executable file would be beneficial and for that I’d use C++, which leads me onto my
final point for further development.
And finally for the sake of optimisation and efficiency, I plan to recreate this protype in a more advanced
way, using C++ and OpenGL. Since C++ has memory optimisation features, generating terrains would be
both quicker and more efficient as oppose to maintaining a system using JavaScript and THREE.js. Given that
performance and efficiency stutters upon changing the terrain parameters seemed to be a recurring theme
when testing on varying machines, therefore I believe changing to a more performance optimised
language would be the best move in the future for development.



### References Used: 
[Perlin Noise Algorithm](https://github.com/daniilsjb/perlin-noise?tab=readme-ov-file)

[Three.js Documentation](https://threejs.org/docs/)






