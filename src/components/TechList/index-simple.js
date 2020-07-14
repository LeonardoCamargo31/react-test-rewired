import React, { useState, useEffect } from 'react'

export default function TechList() {
  const [techs, setTechs] = useState([])
  const [newTech, setNewTech] = useState([])

  // como um componentDidMount
  useEffect(() => {
    const techs = localStorage.getItem('techs')
    if (techs) {
      setTechs(JSON.parse(techs))
    }
  }, [])

  // para preencher o localstorage
  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs))
  }, [techs])

  function handleAddTech() {
    setTechs([...techs, 'Node.js'])
    setNewTech('')
  }

  return (
    <form data-testid="tech-form" onSubmit={handleAddTech}>
      <ul data-testid="tech-list">
        {techs.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <label htmlFor="tech">Tech</label>
      <input
        type="text"
        id="tech"
        value={newTech}
        onChange={(e) => e.target.value}
      />
      <button type="button" onClick={handleAddTech}>
        Adicionar
      </button>
    </form>
  )
}
