# EasyCar Mobile App

Este repositório contém o código-fonte da aplicação mobile **EasyCar**, desenvolvida em React Native. O projeto foi inspirado na **Jornada JS** do canal [Dev Point](https://devpoint.com.br/) e foi criado com o objetivo de praticar e aprofundar meus conhecimentos em React Native.

---

## Tela Inicial

| Tela Inicial |
|:------------:|
| <img src="https://imgur.com/zR8vaIG.png" width="200"> |

---

## Telas Passageiro

| Tela 1 | Tela 2 | Tela 3 |
|:------:|:------:|:------:|
| <img src="https://imgur.com/KDyPWz8.png" width="200"> | <img src="https://imgur.com/KuMDGeY.png" width="200"> | <img src="https://imgur.com/aLkHegL.png" width="200"> |

---

## Telas Motorista

| Tela 1 | Tela 2 | Tela 3 |
|:------:|:------:|:------:|
| <img src="https://imgur.com/H7DV556.png" width="200"> | <img src="https://imgur.com/v3IDB9A.png" width="200"> | <img src="https://imgur.com/Ee0KV6s.png" width="200"> |

---

## Descrição

O EasyCar é uma aplicação de exemplo que simula funcionalidades básicas de um app de caronas. A integração com o banco de dados já possui algumas informações de exemplo, permitindo testar e demonstrar as funcionalidades implementadas sem a necessidade de uma hospedagem real. Este projeto foi desenvolvido principalmente para aprendizado e experimentação, e não está hospedado em produção.

## Funcionalidades

- **Localização e Mapas:** Exibição de mapas com a posição atual do usuário utilizando componentes como `MapView` e `Marker`.
- **Solicitação de Carona:** Interface para o usuário solicitar uma carona e interagir com os dados do backend.
- **Integração com Banco de Dados:** Simulação de um backend com dados de exemplo para teste e demonstração das funcionalidades.
- **Atualização de Dados:** Carregamento e atualização de informações via chamadas API.

## Tecnologias Utilizadas

- **React Native:** Framework para desenvolvimento mobile.
- **Expo:** Ferramenta para facilitar o desenvolvimento e os testes em dispositivos reais ou emuladores.
- **API:** Integração com um backend simulado que já possui dados de exemplo.
- **React Navigation:** Gerenciamento de rotas e navegação na aplicação.
- **Expo Location e MapView:** Para captura da localização e exibição de mapas.

## Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn
- Expo CLI (instalável via `npm install -g expo-cli`)

## Como Executar o Projeto

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/vitormenoli/easycar-mobile.git
    cd easycar-mobile
    ```

2. **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3. **Inicie o projeto com Expo:**
    ```bash
    expo start
    ```

4. **Siga as instruções:**  
   Utilize o app Expo Go no seu dispositivo ou um emulador para visualizar a aplicação.

## Observações

- **Banco de Dados com Dados de Exemplo:**  
  O banco de dados integrado ao projeto já contém informações de exemplo, o que facilita os testes das funcionalidades sem a necessidade de inserir dados manualmente.

- **Projeto para Aprendizado:**  
  Este projeto não está hospedado, pois foi desenvolvido com o intuito de treinar meus conhecimentos em React Native e explorar novas funcionalidades.