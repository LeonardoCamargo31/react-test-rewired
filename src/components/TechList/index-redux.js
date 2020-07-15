import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTech } from '../../store/modules/techs/action'

export default function TechList() {
  const [newTech, setNewTech] = useState([])

  const dispatch = useDispatch()

  // carregando dados do reducer techs
  const techs = useSelector((state) => state.techs)

  function handleAddTech() {
    // disparar minha action
    dispatch(addTech(newTech))
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
        id="tech"
        value={newTech}
        onChange={(e) => setNewTech(e.target.value)}
      />

      <button type="button" onClick={handleAddTech}>
        Adicionar
      </button>
    </form>
  )
}
