ColorMat is a JavaScript class used to create a color manipulation interface.
- It enables dynamic layering of colored elements with interactive controls, rendered within a designated DOM container.

---

### Definition
`ColorMat` is a class that constructs a visual interface for managing colored layers on a canvas-like element. It initializes a container (`matMain`), a display area (`mat`), and a control panel (`controllerMaster`). On instantiation, it automatically adds a random-colored layer using `addColorLayer`.

```javascript
305:346:/c:/Users/katos/Desktop/2020A-Katoso/coordinator/assets/js/main.js
class ColorMat {
    constructor() {
        this.matMain = document.createElement('div');   
        this.matMain.classList.add('mat_main');

        this.mat = document.createElement('div');   
        this.mat.classList.add('mat');
        this.mat.style.width = "200px";
        this.mat.style.height = "200px";
        this.mat.style.position = "relative";

        this.controllerMaster = document.createElement('div');
        this.controllerMaster.classList.add('controller_master');

        this.layerID = 0;
        this.layer = []; // Stores ColorChip instances

        this.matMain.append(this.mat);
        this.matMain.append(this.controllerMaster);

        // Adds initial random HSL color layer
        this.addColorLayer(`hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`, "simple");

        // Appends entire UI to .character_wrapper in DOM
        document.querySelector('.character_wrapper').append(this.matMain);
    }

    addColorLayer(color = "#FFFFFF", mode = "simple") {
        this.layerID++;
        // Creates new ColorChip and stores it
        this.layer.push(new ColorChip(color, mode, this.mat, this.controllerMaster));
        this.rerender(); // Rebuilds visual layer order
    }

    rerender() {
        this.mat.innerHTML = ""; // Clears current display
        this.layer.forEach(layer => {
            this.mat.append(layer.layer); // Re-appends each layer
        });
    }
}
```

- **Type**: Class
- **Purpose**: UI component for layered color composition
- **Fields**:
  - `matMain`: Root DOM element (`<div class="mat_main">`)
  - `mat`: Display canvas (`<div class="mat">`, 200×200px)
  - `controllerMaster`: Container for control panels
  - `layer`: Array of `ColorChip` instances representing color layers
  - `layerID`: Incrementing ID counter for layers
- **Side effects**: 
  - Modifies DOM by appending to `.character_wrapper`
  - Creates and manages multiple DOM elements and event-driven UI components via `ColorChip`
- **Dependencies**: Relies on `ColorChip` class (not shown), which handles individual layer controls and rendering

---

### Example Usages
`ColorMat` is instantiated when a user clicks the `.character_adder__colorChipTest` button, adding a new color manipulation interface to the page. This is part of a character customization system where multiple entities (e.g., `Jonny`, `Jimmy`, `Rolf`) can be added.

```javascript
376:379:/c:/Users/katos/Desktop/2020A-Katoso/coordinator/assets/js/main.js
document.querySelector('.character_adder__colorChipTest').addEventListener('click', b => {
    b.preventDefault();
    characters.push(new ColorMat()); // Adds new ColorMat instance to global array
});
```

- **Usage context**: Used as a test or development tool for experimenting with color layers
- **Integration**: Part of a larger system managing character-like UI components; stored in the global `characters` array
- **Scope**: Low usage — only one known reference in the codebase
- **Trigger**: User-initiated via a dedicated button in the UI

---

### Notes
- Despite its name, `ColorMat` is not related to mathematical matrices — "Mat" likely refers to a "material" or "canvas" for color application.
- The class does not accept parameters in its constructor in actual use, even though the parameter `c` (or `co`) is declared — it is unused.
- It relies on `ColorChip` to provide per-layer controls (e.g., hue, saturation, opacity, blend mode), though `ColorChip` is not defined in the provided context.

---

### See Also
- `ColorChip`: Core component used by `ColorMat` to manage individual color layers and their UI controls.
- `Jonny`, `Jimmy`, `Rolf`: Other character classes added similarly via buttons, suggesting `ColorMat` is part of a shared UI pattern.
- `.character_wrapper`: DOM element where all `ColorMat` instances are appended; central to layout.
- `characters`: Global array storing all instantiated character-like objects, including `ColorMat` instances.