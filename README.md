# Vapty Play — site institucional

Landing page estática e responsiva inspirada nas artes de referência da Vapty Play (roxo neon, prata, trem de alta velocidade e navio como metáforas de destinos).

## Funcionalidades implementadas

- Página inicial com ilustração vetorial autoral do trem e visual roxo/prata.
- Seletor acessível de modalidade (Pré-pago / Pós-pago).
- Catálogo pesquisável com os 22 nomes presentes nas artes.
- Modal de consulta por servidor e mensagem de WhatsApp montada com modalidade e nome.
- Navegação adaptada para dispositivos móveis, FAQ, rodapé e ilustração vetorial de navio.
- Sem dependências JavaScript, sem banco de dados e sem credenciais.

## Desenvolvimento local

Este projeto não precisa de Node ou instalação de pacotes. Abra \`index.html\` no navegador ou inicie um servidor estático:

\`\`\`bash
python3 -m http.server 5173
\`\`\`

Depois acesse http://localhost:5173.

## Configuração necessária antes de divulgar

Abra \`script.js\` e confirme o valor de \`CONTACT_WHATSAPP\` na primeira seção. O número configurado nesta primeira versão é **5575983151162**, usando o formato DDI + DDD + telefone. Substitua caso o atendimento da Vapty Play utilize outro número.

Os nomes dos 22 servidores e a contagem refletem exclusivamente as artes fornecidas. **Não há validação de disponibilidade, integração com painéis ou ativação de acessos**. Pré-pago e pós-pago são opções de interesse; o site não processa pagamentos.

## Estrutura

\`\`\`text
index.html       # Conteúdo semântico e ilustrações SVG
styles.css       # Layout, paleta, responsividade e acessibilidade
script.js        # Busca, modalidade, diálogo e links de WhatsApp
vercel.json      # Ajustes mínimos de hospedagem e cabeçalhos
\`\`\`

## Publicação na Vercel

1. Importe este repositório no painel da Vercel.
2. Selecione **Other** como framework, sem build command.
3. Defina a raiz do projeto como **/** e publique a branch \`main\`.
4. Revise o número comercial, os textos e o domínio antes de divulgar.

Nenhuma variável de ambiente é exigida.

## Personalização

- Cores: arquivo \`styles.css\`, variáveis em \`:root\`.
- Servidores: array \`SERVERS\` no \`script.js\`.
- WhatsApp: constante \`CONTACT_WHATSAPP\` no \`script.js\`.
- Textos: \`index.html\`.

### Limites e próximas etapas

Esta versão é um **MVP de apresentação e captação de interesse**, não um painel real de revenda. Integrações comerciais e funções de login/gestão deverão ser implementadas em etapa separada, com autorização no servidor, contratos adequados e validação dos fornecedores. As ilustrações SVG foram feitas a partir da direção de arte e não incorporam as imagens promocionais originais nem personagens de terceiros.
