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

E adicionamos o `@testing-library/react/cleanup-after-each`, pois como nossos testes precisam ter um DOM ficticia, depois de cada um dos testes ele vai limpar essa DOM. Se não essa dom, iria ficar incrementando a cada teste.

`@testing-library/jest-dom/extend-expect` basicamente para aplicar as regras do jest-dom para extender as funcionalidades do jest em todos os testes. Se não teria que chamar em todos os testes essa lib. Pr exemplo:

```js
import React from 'react'
import Basic from './Basic'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

...os testes
```

Debug

```js
const { getByText, getByTestId, debug } = render(<Component/>)
    fireEvent.click(getByText('Adicionar'))

    debug()

```