var app = require("../app")
var request = require("supertest")


 test('Sign-up - Body correct', async (done) => {
   await request(app).post('/users/sign-up')
   .send({email: 'test@yopmail.fr', password: 'azerty', confirmPassword: 'azerty'})
   .expect(200)
   .expect({result: true, isLogin: true, message:'success', user: {email: 'test@yopmail.fr', password: 'azerty', token: 'dgaiuhdoazhdoaz'}});
   done();
 })

 test('Sign-up - Body incomplet', async (done) => {
  await request(app).post('/users/sign-up')
  .send({email: 'test@yopmail.fr', password: 'azerty'})
  .expect(200)
  .expect({result: false, message: 'error'});
  done();
})

test('Sign-in - Body correct', async (done) => {
  await request(app).post('/users/sign-in')
  .send({email: 'test@yopmail.fr', password: 'azerty'})
  .expect(200)
  .expect({result: true, isLogin: true, message:'success', user: {email: 'test@yopmail.fr', password: 'azerty', token: 'dgaiuhdoazhdoaz'}});
  done();
})

test('Sign-in - Body incomplet', async (done) => {
 await request(app).post('/users/sign-in')
 .send({email: 'test@yopmail.fr'})
 .expect(200)
 .expect({result: false, message: 'error'});
 done();
})

test('Account - Body incorrect', async (done) => {
  await request(app).post('/users/account')
  .send({firstName: 'alex', lastName: 'duchemin', avatarUrl: 'avatrUrl' ,email: 'test@yopmail.fr'})
  .expect(200)
  .expect({ result: false, message:'error'});
  done();
 })

test('Account - Body correct sans changement de mot de passe', async (done) => {
  await request(app).post('/users/account')
  .send({firstName: 'alex', lastName: 'duchemin', avatarUrl: 'avatrUrl' ,email: 'test@yopmail.fr', type: 'recruteur'})
  .expect(200)
  .expect({ result: true, isLogin: true, message:'success', user: {firstName: 'alex', lastName: 'duchemin', avatarUrl: 'avatrUrl' ,email: 'test@yopmail.fr', type: 'recruteur', oldPassword: 'azerty'}});
  done();
 })

 test('Account - Body correct avec changement de mot de passe complet', async (done) => {
  await request(app).post('/users/account')
  .send({ firstName: 'alex', lastName: 'duchemin', avatarUrl: 'avatarUrl', email: 'test@yopmail.fr', type: 'recruteur', oldPassword: 'azerty', newPassword: 'querty', confirmPassword: 'querty'})
  .expect(200)
  .expect({ result: true, isLogin: true, message:'success', user: {firstName: 'alex', lastName: 'duchemin', avatarUrl: 'avatarUrl' ,email: 'test@yopmail.fr', type: 'recruteur', newPassword: 'querty'}});
  done();
 })

 test('Account - Body correct avec oldPassword !newPassword !confirmPassword', async (done) => {
  await request(app).post('/users/account')
  .send({ firstName: 'alex', lastName: 'duchemin', avatarUrl: 'avatarUrl', email: 'test@yopmail.fr', type: 'recruteur', oldPassword: 'azerty' })
  .expect(200)
  .expect({ result: false, message:'error'});
  done();
 })

 test('Account - Body correct avec oldPassword newPassword !confirmPassword', async (done) => {
  await request(app).post('/users/account')
  .send({ firstName: 'alex', lastName: 'duchemin', avatarUrl: 'avatarUrl', email: 'test@yopmail.fr', type: 'recruteur', oldPassword: 'azerty', newPassword: 'querty' })
  .expect(200)
  .expect({ result: false, message:'error'});
  done();
 })

 test('Account - Body correct avec oldPassword && newPassword !== confirmPassword', async (done) => {
  await request(app).post('/users/account')
  .send({ firstName: 'alex', lastName: 'duchemin', avatarUrl: 'avatarUrl', email: 'test@yopmail.fr', type: 'recruteur', oldPassword: 'azerty', newPassword: 'querty', confirmPassword: 'fhjho' })
  .expect(200)
  .expect({ result: false, message:'error'});
  done();
 })

 test('Account - Body correct avec oldPassword !== "azerty" ', async (done) => {
  await request(app).post('/users/account')
  .send({ firstName: 'alex', lastName: 'duchemin', avatarUrl: 'avatarUrl', email: 'test@yopmail.fr', type: 'recruteur', oldPassword: 'dhadi' })
  .expect(200)
  .expect({ result: false, message:'error'});
  done();
 })