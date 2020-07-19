# Teste com react

## Configuração

Usando o `create-react-app` vem o react-scripts já trás uma configuração com jest. Assim por padrão não vamos conseguir modificar muitas coisas na configuração do jest.

Para conseguir modificar, podemos o usar o `react-app-rewired`, vai permitir adicionar algumas configurações a mais, tanto na parte do babel, webpack, e também o jest.

Ao tentar executar, verá um erro, pois o `react-app-rewire` necessita de um arquivo `config-overrides.js`

Aqui no caso não modificamos nada.

```js
module.exports = {}
```

### Entenda o moduleNameMapper

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

## Dependências de teste

Usaremos duas libs

```terminal
npm i -D @testing-library/react @testing-library/jest-dom @types/jest
```

**@testing-library/react**: Especifica para testar componentes no react, montar componentes dentro do nosso teste e verificar se existe um botão no componente por exemplo, navegar no dom.

**@testing-library/jest-dom**: Vai adicionar funcionalidades a mais no jest, que da poder por exemplo do jest criar algumas expects para procurar coisas no nosso Dom.

**@types/jest**: A parte de types do jest, para ter mais autocomplete dentro dos testes, que facilita bastante.

`setupFilesAfterEnv`: Uma lista de arquivos para chamar depois que o ambiente de teste estiver configurado.

**Foi descontinuado o cleanup-after-each**

*O módulo `@testing-library/react/cleanup-after-each` foi descontinuado e não faz mais nada (não é necessário). Você não precisa mais importar este módulo e pode remover com segurança qualquer importação ou configuração que importe esse módulo*

E adicionamos o `@testing-library/react/cleanup-after-each`, pois como nossos testes precisam ter um DOM fictícia, depois de cada um dos testes ele vai limpar essa DOM. Se não essa dom, iria ficar incrementando a cada teste.

`@testing-library/jest-dom/extend-expect` basicamente para aplicar as regras do jest-dom para extender as funcionalidades do jest em todos os testes. Se não teria que chamar em todos os testes essa lib. Pr exemplo:

```js
import React from 'react'
import Basic from './Basic'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

...os testes
```

## Clique no botão

```js
// <button>Adicionar</button> usar o getByText

fireEvent.click(getByText('Adicionar'))
```

## Debugar no meio do teste

```js
const { getByText, getByTestId, debug } = render(<Component/>)
fireEvent.click(getByText('Adicionar'))

debug()

// ...restante do teste
```

## Evento change

```js
// no nosso html deve ter o htmlFor, o texto e input id
<label htmlFor="tech">Tech</label>
<input
  type="text"
  id="tech"
  value={newTech}
  onChange={(e) => e.target.value}
/>

// no nosso teste
fireEvent.change(getByLabelText('Tech'), {
  target: { value: 'Node.js' }
})
```

```js
<ul data-testid="name"></ul>

const ul = getByTestId('tech-list')
```

## Limpar o DOM

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

## Observando uma função

Ele vai sobrepor o local storage do jest

## toHaveBeenCalledWith

Garantir que uma função foi chamada com tais parâmetros

```js
expect(localStorage.setItem).toHaveBeenCalledWith(
  'techs',
  JSON.stringify(['Node.js'])
)
```

## Testes com Redux

Precisamos deixar nosso teste totalmente isolado, para ser um teste unitário.

Usando o `jest.mock('react-redux')`, nosso componente não uso mais o redux e react-redux normal, passam a ser funções fictícias criadas pelo teste.

Agora precisamos mockar as funções usadas no componente.

## Criando mock de uma função

```js
it('should be able to add new tech', () => {
  const { getByTestId, getByLabelText } = render(<TechList />)

  // função mock
  const dispatch = jest.fn()
  // alterar o retorno, quero que retorne nossa função mock
  useDispatch.mockReturnValue(dispatch)

  fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } })
  fireEvent.submit(getByTestId('tech-form'))

  // espero que meu dispatch tenha sido chamado com tal valor
  expect(dispatch).toHaveBeenCalledWith({
    type: 'ADD_TECH',
    payload: { tech: 'Node.js' },
  })
})
```

## Testando Redux Saga

Assim como no redux, não vamos configurar nada demais como store e etc. Vamos mockar também a chamada a API, assim interceptar essa chamada e retornar o valor esperado.

O **runSaga** é responsável por rodar o saga.

```js
// função fake
const dispatch = jest.fn()

// toda vez que chamar o put, vamos chamar essa função mock
// se passar o getState consigo mockar o select do saga
await runSaga({ dispatch }, getTechs).toPromise()
```

## Mock na chamada a API

Para que nosso teste fique isolado, e não dependa da API, precisamos criar um mock no axios, para isso instalamos a dependência `axios-mock-adapter`. O axios já tem esse pacote para ajudar dos testes, no teste com redux tivemos criar uma função mock.

Depois de criada a API Mock:

```js
// todo método get é interceptado
apiMock.onGet('rota')
// a resposta desejada
.reply(statusCode, data)
```

Assim lá no meu saga, quando chamar a API teremos o resultado mock:

```js
const response = yield call(api.get, 'techs')
console.log(response) // ['Node.js']
```

## Coverage

**coverageDirectory**: Onde vamos salvar nosso arquivo de Coverage.

Essa flag **--watchAll=false** para não ficar observando as alterações.

**collectCoverageFrom**: !file para remover arquivos que não acho necessário testa-los.
