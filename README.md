# Directive for Boottrap UI Modal

In LEO, sometimes we need to pop up a modal to do something (most of the time to render a selector) and get back data from the modal. This sample project creates an E directive to simplify this process.

## Usage

In your main page, declare the directive as follow:
```html
<leo-modal 
	text="Click me, Im a directive" 
	template-url="view1/myModalContent2.html"
	controller="ModalInstance2Ctrl" 
	modal-closed="modalClosed(result)" 
	modal-dismissed="modalDismissed()" 
	data="items">
</leo-modal>
```
This directive will be rendered as a button in which:
- `text` is the text label on the button
- `template-url` is the path to your modal template (yes, you still have to create it)
- `controller` is the name of your modal controller (yes, you still have to create it)
- `modal-closed` is a scope method that will be invoked when the modal is closed. The parameter of this function is always `result` and it's mapped to what you pass to `$modalInstance.close` in your modal controller
- `modal-dismissed` is a scope method that will be invokved when the modal is dismissed
- `data` is the Javascript object that will be resolved to your modal controller. In your modal controller, you can resolve it with the name `data`

## Features
- Appears as a button so that Rafa can style it at once
- Vertically align the modal to the center of the screen 

## How to run this sample project
This project is seeded from angular-seed, so just run `npm install` then `npm-start`.