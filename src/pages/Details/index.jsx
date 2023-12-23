import { Container, Links, Content } from "./styles"

import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"
import { ButtonText } from "../../components/ButtonText"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../services/api"

export function Details() {
  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  function handleBack(){
    navigate(-1)
  }

  async function handleRemove(){
    const confirm = window.confirm("Deseja realmente remover a nota?")

    if(confirm){
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fecthNote() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fecthNote()
  }, [])

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText title="Excluir Nota" onClick={handleRemove} />
            <h1>{data.title}</h1>

            <p>{data.description}</p>

            {data.links && (
              <Section title="Links Úteis">
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a target="_blank" href={link.url}>
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {data.tags && (
              <Section title="Marcadores">
                <Links>
                  {data.tags.map((tag) => (
                    <Tag title={tag.name} key={tag.id} />
                  ))}
                </Links>
              </Section>
            )}
            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      )}
    </Container>
  )
}
