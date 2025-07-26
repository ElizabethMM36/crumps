const { db } = require('../firebase');

exports.signup = async (req, res) => {
  const { email, password, role, name } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    const uid = userRecord.uid;

    await db.collection('users').doc(uid).set({
      name,
      email,
      role,
      approved: role === 'restaurant' ? false : true
    });

    res.status(201).json({ uid, message: 'Signup successful' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
