const request = require('supertest');
const app = require('../route/server'); 
const { Image } = require('../models/index'); 

describe('API Routes', () => {
    beforeAll(async () => {
        // Préparer la base de données pour les tests
        await Image.destroy({ where: {} });
        await Image.bulkCreate([
            { name: 'Nature1.jpg', img: 'nature1.jpg', category: 'Nature', email: 'nature@example.com' },
            { name: 'Nature2.jpg', img: 'nature2.jpg', category: 'Nature', email: 'nature2@example.com' },
            { name: 'Tech1.jpg', img: 'tech1.jpg', category: 'Tech', email: 'tech@example.com' }
        ]);
    });

    describe('getImages', () => {
        it('should retrieve all images', async () => {
            const res = await request(app).get('/api/persons/images');
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    describe('getImageByCategory', () => {
        it('should retrieve images by category', async () => {
            const res = await request(app).get('/api/persons/images/category/Nature');
            expect(res.statusCode).toEqual(200);
            expect(res.body.some(image => image.category === 'Nature')).toBeTruthy();
        });
    });

    describe('searchByName', () => {
        it('should find images by name', async () => {
            const res = await request(app).get('/api/persons/images/name/Nature1.jpg');
            expect(res.statusCode).toEqual(200);
            expect(res.body.some(image => image.name === 'Nature1.jpg')).toBeTruthy();
        });
    });

    describe('getImageById', () => {
        it('should retrieve an image by its ID', async () => {
            const image = await Image.findOne({ where: { name: 'Nature1.jpg' } });
            const res = await request(app).get(`/api/persons/images/id/${image.id}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body[0].id).toEqual(image.id);
        });
    });

    describe('getImageByEmail', () => {
        it('should retrieve images by email', async () => {
            const res = await request(app).get('/api/persons/images/email/nature@example.com');
            expect(res.statusCode).toEqual(200);
            expect(res.body.some(image => image.email === 'nature@example.com')).toBeTruthy();
        });
    });

    describe('updateImage', () => {
        it('should update the name of an image', async () => {
            const image = await Image.findOne({ where: { name: 'Tech1.jpg' } });
            const res = await request(app).put(`/api/persons/images/${image.id}`).send({ name: 'TechUpdated.jpg' });
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toContain('mis à jour avec succès');
            const updatedImage = await Image.findByPk(image.id);
            expect(updatedImage.name).toEqual('TechUpdated.jpg');
        });
    });

    describe('addImage', () => {
        it('should add an image', async () => {
            const res = await request(app).post('/api/persons/images').send({
                file: {
                    originalname: 'test.jpg',
                    filename: 'test.jpg'
                },
                body: {
                    articleCategory: 'Test',
                    articleMail: 'test@example.com'
                }
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toContain('successfully');
        });
    });

    describe('deleteImage', () => {
        it('should delete an image', async () => {
            const image = await Image.create({ name: 'ToDelete.jpg', img: 'toDelete.jpg', category: 'Delete', email: 'delete@example.com' });
            const res = await request(app).delete(`/api/persons/images/${image.id}`);
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('supprimée avec succès');
        });
    });

    // Cleanup
    afterAll(async () => {
        await Image.destroy({ where: {} });
    });
});
