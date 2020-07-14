## Configuração

Usando o `create-react-app` vem o react-scripts já trás uma configuração com jest. Assim por padrão não vamos conseguir modificar muitas coisas na configuração do jest.

Para conseguir modificar, podemos o usar o `react-app-rewired`, vai permitir adicionar algumas configurações a mais, tanto na parte do babel, webpack, e também o jest.

Ao tentar executar, verá um erro, pois o `react-app-rewire` necessita de um arquivo `config-overrides.js`

Aqui no caso não modificamos nada.

```js
module.exports = {}
```

### moduleNameMapper

Por padrão o babel-plugin-root-import, para usar na importação o `~/` para se referenciar a /src, por padrão isso não funciona ao jest.

```js
import App from '~/App'
```

Criaremos um jsconfig.json, para o vscode não se perder nas importações.

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "~/*": ["*"] // qualquer coisa dentro de src
    }
  }
}
```

Usaremos duas libs

```terminal
npm i -D @testing-library/react @testing-library/jest-dom @types/jest
```

**@testing-library/react**: Especifica para testar componentes no react, montar componentes dentro do nosso teste e verificar se existe um botão no componente por exemplo, navegar no dom.

**@testing-library/jest-dom**: Vai adicionar funcionalidades a mais no jest, que da poder por exemplo do jest criar algumas expects para procurar coisas no nosso Dom.

**@types/jest**: A parte de types do jest, para ter mais autocomplete dentro dos testes, que facilita bastante.

`setupFilesAfterEnv`: Uma lista de arquivos para chamar depois que o ambiente de teste estiver configurado.

E adicionamos o `@testing-library/react/cleanup-after-each`, pois como nossos testes precisam ter um DOM fictícia, depois de cada um dos testes ele vai limpar essa DOM. Se não essa dom, iria ficar incrementando a cada teste.

`@testing-library/jest-dom/extend-expect` basicamente para aplicar as regras do jest-dom para extender as funcionalidades do jest em todos os testes. Se não teria que chamar em todos os testes essa lib. Pr exemplo:

```js
import React from 'react'
import Basic from './Basic'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

...os testes
```

### Clique no botão

```js
// <button>Adicionar</button> usar o getByText

fireEvent.click(getByText('Adicionar'))
```

### Debug

```js
const { getByText, getByTestId, debug } = render(<Component/>)
    fireEvent.click(getByText('Adicionar'))

    debug()

```

### Evento change

```js
// no nosso html deve ter o htmlFor, o texto e input id
/*
  <label htmlFor="tech">Tech</label>
  <input
    type="text"
    id="tech"
    value={newTech}
    onChange={(e) => e.target.value}
  />
*/

fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } })
```

```js
<ul data-testid="name"></ul>

const ul = getByTestId('tech-list')
```

### cleanup

Ele basicamente limpa o DOM

Exemplo:

```js
const render1 = render(<TechList />)

fireEvent.change(render1.getByLabelText('Tech'), {
  target: { value: 'Node.js' },
})
fireEvent.submit(render1.getByTestId('tech-form'))

cleanup()

const render2 = render(<TechList />)

const ul = render2.getByTestId('tech-list')
const li = render2.getByText('Node.js')
expect(ul).toContainElement(li)
```

### jest-localstorage-mock

Ele vai sobrepor o localstorage do jest

### toHaveBeenCalledWith

Garantir que uma função foi chamada com tais parâmetros

```js
expect(localStorage.setItem).toHaveBeenCalledWith(
  'techs',
  JSON.stringify(['Node.js'])
)
```

## Redux

Precisamos deixar nosso teste totalmente isolado, para ser um teste unitário.

Usando o `jest.mock('react-redux')`, nosso componente não uso mais o redux e react-redux normal, passam a ser funções fictícias criadas pelo teste.

Agora precisamos mockar as funções usadas no componente.