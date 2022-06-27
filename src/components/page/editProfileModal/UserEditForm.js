// import { Form, Input, DatePicker, Select, Button, Row, Col } from 'antd'
// import React from 'react'
// import { useEffect, useState } from 'react'
// import moment from 'moment'

// import { get, put } from '../../service/requestApi'
// import emitter from '../../utils/emitter'
// import styles from './UserEditForm.module.scss'
// import UserAvatar from './UserAvatar'
// import UserDescription from './UserDescription'
// import './Index.scss'
// import Dialog from '../../common/createModal/Modal'
// import { messageRequest } from '../../index'
// import { dateTime, typePopup } from '../../index'

// const API = '/members'
// const dateFormat = 'DD/MM/YYYY'
// const bankName = [
//   {
//     id: 1,
//     name: 'Vietcombank',
//     displayName: 'Vietcombank',
//   },
//   {
//     id: 2,
//     name: 'Techcombank',
//     displayName: 'Techcombank',
//   },
//   {
//     id: 3,
//     name: 'Vietinbank',
//     displayName: 'Vietinbank',
//   },
//   {
//     id: 4,
//     name: 'BIDV',
//     displayName: 'BIDV',
//   },
//   {
//     id: 5,
//     name: 'SHB',
//     displayName: 'SHB',
//   },
//   {
//     id: 6,
//     name: 'MB Bank',
//     displayName: 'MB Bank',
//   },
// ]

// const UserEditForm = () => {
//   const [modalVisible, setModalVisible] = useState(false)
//   const [profileInfo, setProfileInfo] = useState([])
//   const [avatar, setAvatar] = useState(null)

//   emitter.on('EVENT_GET_AVATAR', (data) => {
//     setAvatar(data.data)
//   })
//   useEffect(() => {
//     get(API + '/edit').then((res) => {
//       setProfileInfo(res?.data)
//     })
//   }, [modalVisible])

//   const onSubmit = async (values) => {
//     console.log('avatar', avatar)
//     const valueEdit = {
//       ...values,
//       birth_date: dateTime.formatDate(values.birth_date),
//       identity_card_date: dateTime.formatDate(values.identity_card_date),
//       passport_expiration: values.passport_expiration
//         ? dateTime.formatDate(values.passport_expiration)
//         : '',
//       nick_name: values.nickname,
//       gender: values.gender,
//       marital_status: values.marital_status,
//       start_date: dateTime.formatDate(values.start_date),
//       avatar: avatar,
//     }
//     console.log('value', valueEdit)

//     try {
//       // const data = await put(API + '/update', valueEdit, {
//       //   headers: { 'Content-Type': 'multipart/form-data' },
//       // })
//       const data = await put(API + '/update', valueEdit)
//       if (data.status) {
//         typePopup.popupNotice(
//           typePopup.SUCCESS_MESSAGE,
//           'Message',
//           messageRequest.UPDATE,
//           1,
//         )
//         setModalVisible(false)
//       }
//     } catch (error) {
//       typePopup.popupNotice(
//         typePopup.ERROR_MESSAGE,
//         'Message',
//         'An error occurred',
//         1,
//       )
//     }
//   }
//   return (
//     <>
//       <h3 onClick={() => setModalVisible(true)}>Edit Profile</h3>
//       <Dialog
//         isOpen={modalVisible}
//         handleModal={() => setModalVisible(!modalVisible)}
//       >
//         <fieldset className={styles.fieldset}>
//           <legend>My Profile</legend>
//           <Form
//             layout="horizontal"
//             initialValues={{
//               gender:
//                 profileInfo.gender == 1 ? 1 : profileInfo.gender == 0 ? 0 : '',
//               nickname: profileInfo.nick_name,
//               identity_number: profileInfo.identity_number,
//               identity_card_place: profileInfo.identity_card_place,
//               birth_date: profileInfo.birth_date
//                 ? moment(profileInfo.birth_date)
//                 : '',
//               identity_card_date: profileInfo.identity_card_date
//                 ? moment(profileInfo.identity_card_date)
//                 : '',
//               passport_number: profileInfo.passport_number,
//               passport_expiration: profileInfo.passport_expiration
//                 ? moment(profileInfo.passport_expiration)
//                 : '',
//               nationality: profileInfo.nationality,
//               other_email: profileInfo.other_email,
//               skype: profileInfo.skype,
//               facebook: profileInfo.facebook,
//               bank_name: profileInfo.bank_name,
//               bank_account: profileInfo.bank_account,
//               marital_status:
//                 profileInfo.marital_status == 1
//                   ? 1
//                   : profileInfo.marital_status == 2
//                   ? 2
//                   : profileInfo.marital_status == 3
//                   ? 3
//                   : 4,
//               academic_level: profileInfo.academic_level,
//               permanent_address: profileInfo.permanent_address,
//               temporary_address: profileInfo.temporary_address,
//               tax_identification: profileInfo.tax_identification,
//               insurance_number: profileInfo.insurance_number,
//               healthcare_provider: profileInfo.healthcare_provider,
//               tax_identification_full: profileInfo.tax_identification_full,
//               emergency_contact_name: profileInfo.emergency_contact_name,
//               emergency_contact_relationship:
//                 profileInfo.emergency_contact_relationship,
//               emergency_contact_number: profileInfo.emergency_contact_number,
//               start_date: moment(profileInfo.start_date).format('DD-MM-YYYY'),
//             }}
//             onFinish={onSubmit}
//             labelCol={{
//               span: 12,
//             }}
//           >
//             <div className={styles.form}>
//               <div className={styles.infoForm}>
//                 <div className={styles.infoBasicRow}>
//                   <div className={styles.infoAvatar}>
//                     <UserAvatar />
//                   </div>
//                   <div className={styles.infoDescription}>
//                     <UserDescription />
//                   </div>
//                 </div>
//                 <br />
//                 <hr style={{ backgroundColor: 'gray', width: '100%' }} />
//                 <div className={styles.infoRowContainer}>
//                   <Row>
//                     <Col span={24}>
//                       <Row>
//                         <Col span={12}>
//                           <Row>
//                             <Col span={10}>
//                               <div className={styles.labelInput}>
//                                 Gender:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item labelAlign="left" name="gender">
//                                 <Select>
//                                   <Select.Option value={1}>Male</Select.Option>
//                                   <Select.Option value={0}>
//                                     Female
//                                   </Select.Option>
//                                 </Select>
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={10}>
//                               <div className={styles.labelInput}>
//                                 Birth Date:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="birth_date"
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: 'Please fill out this field!',
//                                   },
//                                 ]}
//                               >
//                                 <DatePicker format={dateFormat} />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={10}>
//                               <div className={styles.labelInput}>
//                                 Identity Number:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="identity_number"
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: 'Please fill out this field!',
//                                   },
//                                   {
//                                     pattern: new RegExp(/^[0-9]+$/),
//                                     message: 'Only numbers are allowed',
//                                   },
//                                   {
//                                     max: 12,
//                                     message: 'Must not exceed 12 characters',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={10}>
//                               <div className={styles.labelInput}>
//                                 Date of issue Identity:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="identity_card_date"
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: 'Please fill out this field!',
//                                   },
//                                 ]}
//                               >
//                                 <DatePicker format={dateFormat} />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={10}>
//                               <div className={styles.labelInput}>
//                                 Place of issue Identity:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="identity_card_place"
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: 'Please field out this field!',
//                                   },
//                                   {
//                                     max: 50,
//                                     message: 'Must not exceed 50 characters',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={10}>
//                               <div className={styles.labelInput}>
//                                 Passport Number:
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="passport_number"
//                                 rules={[
//                                   {
//                                     max: 20,
//                                     message: 'Must not exceed 20 characters.',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={10}>
//                               <div className={styles.labelInput}>
//                                 Passport Expiration:
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="passport_expiration"
//                               >
//                                 <DatePicker format={dateFormat} />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={10}>
//                               <div className={styles.labelInput}>
//                                 Nationality:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="nationality"
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: 'Please fill out this field!',
//                                   },
//                                   {
//                                     max: 50,
//                                     message: 'Must not exceed 50 characters',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                         </Col>
//                         <Col span={12}>
//                           <Row>
//                             <Col span={6}></Col>
//                             <Col span={8}>
//                               <div className={styles.labelInput}>Nickname:</div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 name="nickname"
//                                 labelAlign="left"
//                                 rules={[
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={6}></Col>
//                             <Col span={8}>
//                               <div className={styles.labelInput}>
//                                 Other Email:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="other_email"
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: 'Please fill out this field!',
//                                   },
//                                   {
//                                     type: 'email',
//                                     message: 'The input is not valid E-mail!',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={6}></Col>
//                             <Col span={8}>
//                               <div className={styles.labelInput}>Skype:</div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="skype"
//                                 rules={[
//                                   {
//                                     max: 30,
//                                     message: 'Must not exceed 30 characters.',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={6}></Col>
//                             <Col span={8}>
//                               <div className={styles.labelInput}>Facebook:</div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="facebook"
//                                 rules={[
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={6}></Col>
//                             <Col span={8}>
//                               <div className={styles.labelInput}>
//                                 Bank Name:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="bank_name"
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: 'Please input your Bank Name!',
//                                   },
//                                   {
//                                     max: 70,
//                                     message: 'Must not exceed 70 characters.',
//                                   },
//                                 ]}
//                               >
//                                 <Select showSearch>
//                                   {bankName.map((bank) => (
//                                     <Select.Option
//                                       key={bank.id}
//                                       value={bank.name}
//                                     >
//                                       {bank.displayName}
//                                     </Select.Option>
//                                   ))}
//                                 </Select>
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={6}></Col>
//                             <Col span={8}>
//                               <div className={styles.labelInput}>
//                                 Bank Account:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="bank_account"
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: 'Please input your Bank Account!',
//                                   },
//                                   {
//                                     max: 20,
//                                     message: 'Must not exceed 20 characters.',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={6}></Col>
//                             <Col span={8}>
//                               <div className={styles.labelInput}>
//                                 Marital Status:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="marital_status"
//                               >
//                                 <Select>
//                                   <Select.Option value={1}>
//                                     Married
//                                   </Select.Option>
//                                   <Select.Option value={2}>
//                                     Single
//                                   </Select.Option>
//                                   <Select.Option value={3}>
//                                     Divorced
//                                   </Select.Option>
//                                   <Select.Option value={4}>Other</Select.Option>
//                                 </Select>
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={6}></Col>
//                             <Col span={8}>
//                               <div className={styles.labelInput}>
//                                 Academic Level:
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="academic_level"
//                                 rules={[
//                                   {
//                                     max: 50,
//                                     message: 'Must not exceed 50 characters.',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                         </Col>
//                       </Row>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col span={5}>
//                       <div className={styles.labelInput}>
//                         Permanent Address:
//                         <span className={styles.requiredField}>(*)</span>
//                       </div>
//                     </Col>
//                     <Col span={19}>
//                       <Form.Item
//                         label=""
//                         labelAlign="left"
//                         name="permanent_address"
//                         labelCol={{
//                           sm: {
//                             span: 11,
//                           },
//                           lg: {
//                             span: 5,
//                           },
//                         }}
//                         rules={[
//                           {
//                             required: true,
//                             message: 'Please input your Permanent Address!',
//                           },
//                           {
//                             max: 255,
//                             message:
//                               'This field must be maximum 255 characters.',
//                           },
//                           {
//                             whitespace: true,
//                             message: 'Must not enter only whitespace !',
//                           },
//                         ]}
//                       >
//                         <Input className={styles.addressInput} />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col span={5}>
//                       <div className={styles.labelInput}>
//                         Temporary Address:
//                         <span className={styles.requiredField}>(*)</span>
//                       </div>
//                     </Col>
//                     <Col span={19}>
//                       <Form.Item
//                         label=""
//                         labelAlign="left"
//                         name="temporary_address"
//                         labelCol={{
//                           sm: {
//                             span: 11,
//                           },
//                           lg: {
//                             span: 5,
//                           },
//                         }}
//                         rules={[
//                           {
//                             required: true,
//                             message: 'Please input your Temporary Address!',
//                           },
//                           {
//                             max: 255,
//                             message: 'Must not exceed 255 characters.',
//                           },
//                         ]}
//                       >
//                         <Input className={styles.addressInput} />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                 </div>
//                 <br />
//                 <hr style={{ backgroundColor: 'gray', width: '100%' }} />
//                 <div className={styles.infoRowContainer}>
//                   <Row>
//                     <Col span={24}>
//                       <Row>
//                         <Col span={12}>
//                           <Row>
//                             <Col span={10}>
//                               <div className={styles.labelInput}>
//                                 Tax Identification:
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="tax_identification"
//                                 rules={[
//                                   {
//                                     max: 20,
//                                     message: 'Must not exceed 20 characters.',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={10}>
//                               <div className={styles.labelInput}>
//                                 Insurance Number:
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="insurance_number"
//                                 rules={[
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={10}>
//                               <div className={styles.labelInput}>
//                                 Healthcare Provider:
//                               </div>
//                             </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="healthcare_provider"
//                                 rules={[
//                                   {
//                                     max: 30,
//                                     message: 'Must not exceed 30 characters.',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={10}>Tax Identification: </Col>
//                             <Col span={10}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="tax_identification_full"
//                                 rules={[
//                                   {
//                                     max: 20,
//                                     message: 'Must not exceed 20 characters.',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                         </Col>
//                         <Col span={12}>
//                           <Row>
//                             <Col span={2}></Col>
//                             <Col span={14}>
//                               <div className={styles.labelInput}>
//                                 Emergency Contact Name:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={8}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="emergency_contact_name"
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: 'Please fill out this field!',
//                                   },
//                                   {
//                                     max: 70,
//                                     message: 'Must not exceed 70 characters.',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={2}></Col>
//                             <Col span={14}>
//                               <div className={styles.labelInput}>
//                                 Emergency Contact Relationship:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={8}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="emergency_contact_relationship"
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: 'Please fill out this field',
//                                   },
//                                   {
//                                     max: 50,
//                                     message: 'Must not exceed 50 characters.',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={2}></Col>
//                             <Col span={14}>
//                               <div className={styles.labelInput}>
//                                 Emergency Contact Number:
//                                 <span className={styles.requiredField}>
//                                   (*)
//                                 </span>
//                               </div>
//                             </Col>
//                             <Col span={8}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="emergency_contact_number"
//                                 rules={[
//                                   {
//                                     required: true,
//                                     message: 'Please fill out this field!',
//                                   },
//                                   {
//                                     max: 20,
//                                     message: 'Must not exceed 20 characters.',
//                                   },
//                                   {
//                                     whitespace: true,
//                                     message: 'Must not enter only whitespace !',
//                                   },
//                                 ]}
//                               >
//                                 <Input />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col span={2}></Col>
//                             <Col span={14}>
//                               <div className={styles.labelInput}>
//                                 Start Date:
//                               </div>
//                             </Col>
//                             <Col span={8}>
//                               <Form.Item
//                                 label=""
//                                 labelAlign="left"
//                                 name="start_date"
//                               >
//                                 <Input disabled={true} />
//                               </Form.Item>
//                             </Col>
//                           </Row>
//                         </Col>
//                       </Row>
//                     </Col>
//                   </Row>
//                 </div>
//               </div>
//               <div className={styles.buttonContainer}>
//                 <Button className={styles.button} htmlType="submit">
//                   Update
//                 </Button>
//               </div>
//             </div>
//           </Form>
//         </fieldset>
//       </Dialog>
//     </>
//   )
// }

// export default UserEditForm
