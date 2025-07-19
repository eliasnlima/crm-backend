import express from 'express'
import multer from 'multer'
import csvParser from 'csv-parser'
import fs from 'fs'
import Client from '../models/Client.js'
import authMiddleware from '../middlewares/auth.js'

const upload = multer({ dest: 'uploads/' })
const router = express.Router()

router.post('/import-clients', authMiddleware, upload.single('file'), async (req, res) => {
  const results = []

  console.log('🟡 Arquivo recebido:', req.file) // VERIFICAR SE O ARQUIVO CHEGOU

  fs.createReadStream(req.file.path)
    .pipe(csvParser({ separator: ';' }))
    .on('data', (data) => {
      data.user = req.userId
      results.push(data)
    })
    .on('end', async () => {
      try {
        console.log('📄 Dados lidos do CSV:', results) // VERIFICAR O QUE ESTÁ SENDO LIDO

        // 🔴 TESTE: Filtrar dados vazios ou inválidos
        const filtrados = results.filter(d => d.nome && d.user) 
        .map(d => {
              if (d.grupoEconomico === '') d.grupoEconomico = null
              else if (d.grupoEconomico) d.grupoEconomico = Number(d.grupoEconomico)

               return d})

        const inserted = await Client.insertMany(filtrados)
        console.log('✅ Clientes inseridos:', inserted.length)

        res.status(200).json({ message: 'Importação concluída', count: inserted.length })
      } catch (err) {
        console.error('❌ Erro ao importar:', err)
        res.status(500).json({ error: 'Erro ao importar', details: err.message })
      } finally {
        fs.unlinkSync(req.file.path)
      }
    })
})

export default router