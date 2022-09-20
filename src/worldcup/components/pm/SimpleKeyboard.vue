<template>
    <div :class="keyboardClass"></div>
</template>

<script>
    import Keyboard from "simple-keyboard";
    import "simple-keyboard/build/css/index.css";
    import keyNavigation from "simple-keyboard-key-navigation";


    export default {
        name: "SimpleKeyboard",
        props: {
            keyboardClass: {
                default: "simple-keyboard",
                type: String
            },
            chatTxt: {
                type: String
            }
        },
        data: () => ({
            keyboard: null,
            showKeyNavigation: true,
            displayP: {//persian display
                '{space}': 'space',
                '{bksp}': 'backspace',
                '{enter}': 'enter',
                '{shift}': 'abc',
                '{lock}': 'caps',
                '{tab}': 'Tab',
            },
            displayE: {//english display
                '{space}': 'space',
                '{bksp}': 'backspace',
                '{enter}': 'enter',
                '{shift}': 'اب پ',
                '{lock}': 'caps',
                '{tab}': 'Tab',
            },
            displayC: {//english display
                '{space}': 'space',
                '{bksp}': 'backspace',
                '{enter}': 'enter',
                '{shift}': 'abc',
                '{lock}': 'caps',
                '{tab}': 'Tab',
            },
        }),
        created() {

        },
        mounted() {
            this.keyboard = new Keyboard(this.keyboardClass, {
                onChange: this.onChange,
                onKeyPress: this.onKeyPress,
                theme: "hg-theme-default hg-layout-default myTheme",
                useMouseEvents: true,
                enableKeyNavigation: false,
                // newLineOnEnter: true,
                tabCharOnTab: true,
                display: this.displayP,
                disableCaretPositioning: false,
                disableRowButtonContainers: true,
                syncInstanceInputs: true,
                buttonAttributes: [
                    {
                        attribute: "TopEdge",
                        value: "1",
                        buttons: "1 2 3 4 5 6 7 8 9 0 {bksp} ! # $ % & * ( ) _ +"
                    },
                    {
                        attribute: "RightEdge",
                        value: "1",
                        buttons: "{bksp} {shift} چ پ {space} {enter} \\"
                    },
                ],
                modules: [
                    keyNavigation
                ],
                layout: {
                    shift: [
                        "! # $ % & * ( ) _ + {bksp}",
                        "{tab} q w e r t y u i o p [ ]",
                        "a s d f g h j k l ' {enter}",
                        "{lock} z x c v b n m , . / {shift}",
                        ".com @ {space}"
                    ],
                    default: [

                        "1 2 3 4 5 6 7 8 9 0 {bksp}",
                        "ض ص ث ق ف غ ع ه خ ح ج چ",
                        "ش س ی ب ل ا ت ن م ک گ پ",
                        "{shift} ظ ط ز ر ذ د ئ و . {enter}",
                        ".com @ {space}"
                    ],
                    caps: [
                        "1 2 3 4 5 6 7 8 9 0 {bksp}",
                        "{tab} Q W E R T Y U I O P [ ]",
                        "A S D F G H J K L ' {enter}",
                        "{lock} Z X C V B N N , . / {shift}",
                        ".com @ {space}"
                    ]
                },
                buttonTheme: [
                    {
                        class: "hgred",
                        buttons: "q w e r t y"
                    }
                ],
            });
        },
        methods: {

            onTopEdge() {
                let elm = document.getElementsByClassName("hg-keyMarker")[0].getAttribute('TopEdge');
                // let elm = this.keyboard.getButtonElement('1').getAttribute('TopEdge');
                if (elm == "1") {
                    return true
                }
                return false;
            },
            onRightEdge() {
                let elm = document.getElementsByClassName("hg-keyMarker")[0].getAttribute('RightEdge');
                // let elm = this.keyboard.getButtonElement('1').getAttribute('TopEdge');
                // if (elm == "1") {
                //     return true
                // }
                return false;
            },
            clearTxtInp() {
                this.keyboard.clearInput();
            },
            down() {
                this.keyboard.modules.keyNavigation.down();
            },
            toggleHover(type) {
                let boolVal = (type == 0) ? false : true
                this.keyboard.setOptions({
                    enableKeyNavigation: boolVal
                });
            },
            up() {
                if (this.onTopEdge()) {
                    return false
                }
                this.keyboard.modules.keyNavigation.up()
                return true

            },
            left() {
                this.keyboard.modules.keyNavigation.left();
            },
            right() {
                if (this.onRightEdge()) {
                    return false
                }
                this.keyboard.modules.keyNavigation.right();
                return true
            },
            enter() {
                this.keyboard.modules.keyNavigation.press();
            },
            onChange(input) {
                // console.log('onChange', input)
                this.$emit("onChange", input);
            },
            onKeyPress(button) {
                this.$root.$emit("remove_Hover", 2)
                this.$emit("onKeyPress", button);

                if (button === '{enter}') {
                    this.$root.$emit("press_submit");
                    return false
                }
                if (button === "{shift}" || button === "{lock}") this.handleShift(button);
            },
            handleShift(button) {
                let currentLayout = this.keyboard.options.layoutName;
                let shiftToggle;
                let showDisplay;

                if (button === "{shift}") {
                    shiftToggle = currentLayout === "default" ? "shift" : "default";

                }
                if (button === "{lock}") {
                    shiftToggle = currentLayout === "shift" ? "caps" : "shift";
                }

                if (currentLayout === "default") showDisplay = this.displayE
                if (currentLayout === "caps") showDisplay = this.displayC
                if (currentLayout === "shift") showDisplay = this.displayP

                this.keyboard.setOptions({
                    layoutName: shiftToggle,
                    display: showDisplay
                });
            }
        },
        watch: {
            chatTxt(input) {

                this.keyboard.setInput(input);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hg-theme-default {
        background-color: #1c1f28 !important;
        padding: 10px !important;
        overflow: visible;
    }

</style>
