import { Container, Form } from "./styles"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"
import { Link } from "react-router-dom"
import { useState } from "react"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"

export function New() {
  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const navigate = useNavigate()

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink])
    setNewLink("")
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted))
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted))
  }

  async function handleNewNote() {
    if(!title){
      return alert("Digite o titulo da nota")
    }
    if (newTag || newLink) {
      return alert(
        `Você deixou um${
          newTag ? "a tag" : " link"
        } no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio`
      )
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    })

    alert("Nota criada com sucesso")
    navigate(-1)
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">Voltar</Link>
          </header>

          <Input
            placeholder="Titulo"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links Úteis">
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
            <NoteItem
              isNew
              placeholder="Novo Link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}
              <NoteItem
                isNew
                placeholder="Nova Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  )
}
