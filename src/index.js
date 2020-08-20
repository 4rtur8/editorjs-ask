require('./index.css').toString()
require('../node_modules/katex/dist/katex.css').toString()
const katex = require('katex')

class Ask {
  static get toolbox () {
    return {
      title: 'Ask',
      icon: '<svg aria-hidden="true" height="15" width="17" focusable="false" data-prefix="fas" data-icon="question" class="svg-inline--fa fa-question fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"></path></svg>'
    }
  }

  constructor ({ data }) {
    this.data = data
    this.wrapper = document.createElement('div')
    this.checkWrapper = document.createElement('div')
    this.input = document.createElement('input')
    this.checkbox = document.createElement('input')
    this.checkbox.type = 'checkbox'
    this.selectList = document.createElement('select')
    this.options = document.createElement('div')
    this.p = document.createElement('p')
    this.result = document.createElement('div')
  }

  render () {
    this.checkbox.value = false
    this.p.innerHTML = 'Opcion Correcta'

    this.selectList.oninput = () => {
      console.log(this.selectList.value)
      this.renderDependType()
    }

    this.input.oninput = () => {
      console.log('input')
    }
    var array = ['Formula', 'Imagen', 'Texto']

    // Create and append the options
    for (var i = 0; i < array.length; i++) {
      var option = document.createElement('option')
      option.value = array[i]
      option.text = array[i]
      this.selectList.appendChild(option)
    }
    this.input.value = this.data && this.data.text ? this.data.text : ''
    this.selectList.value = this.data && this.data.select ? this.data.select : ''
    this.checkbox.checked = this.data && this.data.checkbox ? this.data.checkbox : ''
    console.log(this.selectList.value, 'asdasdasdasd')

    this.input.classList.add('input-ask')
    this.checkbox.classList.add('checkbox-ask')
    this.selectList.classList.add('select-ask')
    this.result.classList.add('result-ask')
    this.wrapper.classList.add('ask')
    this.checkWrapper.appendChild(this.p)
    this.checkWrapper.appendChild(this.checkbox)
    this.options.appendChild(this.selectList)
    this.options.appendChild(this.checkWrapper)
    this.wrapper.appendChild(this.options)
    this.wrapper.appendChild(this.input)
    this.wrapper.appendChild(this.result)

    this.renderDependType()

    return this.wrapper
  }

  renderDependType () {
    if (this.selectList.value === 'Imagen') {
      console.log('imagen xd')
      this._createImage(this.input.value)
    }
    if (this.selectList.value === 'Texto') {
      console.log('texto xd')
      this._createTexto(this.input.value)
    }
    if (this.selectList.value === 'Formula') {
      console.log('formula xd')
      this._createFormula(this.input.value)
    }
  }

  _createImage (src) {
    this.result.innerHTML = ''
    const img = document.createElement('img')
    img.src = src
    this.result.appendChild(img)
  }

  _createFormula (formula) {
    this.result.innerHTML = ''
    katex.render(formula, this.result, {
      throwOnError: false
    })
  }

  _createTexto (txt) {
    this.result.innerHTML = ''
    const text = document.createElement('p')
    text.innerHTML = txt
    this.result.appendChild(text)
  }

  save (blockContent) {
    const input = blockContent.querySelector('.input-ask')
    const checkbox = blockContent.querySelector('.checkbox-ask')
    const select = blockContent.querySelector('.select-ask')
    console.log(checkbox)
    return {
      text: input.value,
      checkbox: checkbox.checked,
      select: select.value
    }
  }
}

module.exports = Ask
