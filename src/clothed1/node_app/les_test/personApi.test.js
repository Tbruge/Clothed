const request = require('supertest');
const app = require('../app'); // Assurez-vous que cela pointe vers votre serveur Express
const db = require('../models'); // Assurez-vous que cela pointe vers votre modèle Sequelize

describe('Person API endpoints', () => {
    beforeAll(async () => {
        // Préparez votre base de données pour les tests, par exemple nettoyez les tables
        await db.person.destroy({ where: {} });
        await db.image.destroy({ where: {} });
    });

    describe('addPerson', () => {
        it('should add a new person if not exists', async () => {
            const res = await request(app).post('/api/persons').send({
                nom: 'Doe',
                prenom: 'John',
                email: 'john.doe@example.com',
                mot_de_passe: '123456'
            });
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('Valid');
        });

        it('should not add a person if email already exists', async () => {
            const res = await request(app).post('/api/persons').send({
                nom: 'Doe',
                prenom: 'John',
                email: 'john.doe@example.com',
                mot_de_passe: '123456'
            });
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('Le compte existe déjà');
        });
    });

    describe('updatePerson', () => {
        it('should update an existing person', async () => {
            const person = await db.person.create({
                nom: 'Doe',
                prenom: 'Jane',
                email: 'jane.doe@example.com',
                password: '654321'
            });

            const res = await request(app).put(`/api/persons/${person.id}`).send({
                nom: 'Updated',
                prenom: 'Jane',
                mot_de_passe: '654321'
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('nom', 'Updated');
        });
    });

    describe('getNameByID', () => {
        it('should get a person name by image ID', async () => {
            const person = await db.person.create({ email: 'unique@example.com', password: 'test1234' });
            const image = await db.image.create({ email: person.email });

            const res = await request(app).get(`/api/persons/name/${image.id}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('email', 'unique@example.com');
        });
    });

    describe('getPersonImage', () => {
        it('should retrieve all images associated with a person ID', async () => {
            const person = await db.person.create({ email: 'imageowner@example.com', password: 'image1234' });
            await db.image.create({ email: person.email, img: 'photo.jpg' });

            const res = await request(app).get(`/api/persons/images/${person.id}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    describe('checkPerson', () => {
        it('should check if a person exists by email and password', async () => {
            const res = await request(app).post('/api/persons/check').send({
                email: 'john.doe@example.com',
                mot_de_passe: '123456'
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('status', 'valid');
        });
    });

    afterAll(async () => {
        // Nettoyez votre base de données après les tests
        await db.person.destroy({ where: {} });
        await db.image.destroy({ where: {} });
    });
});
