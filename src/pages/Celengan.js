import React, { useEffect, useState, Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FindTodo, FindTodoIndex } from '../utils/Celengan';
import { Dialog, Transition } from '@headlessui/react'
import Card from '../components/Card';

const Celengan = ({ celengans, setCelengans }) => {
  let [isOpen, setIsOpen] = useState(false)
  const [jumlah, setJumlah] = useState("")
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const navigate = useNavigate()
  const id = useParams()
  const [data, setData] = useState([])

  const handleCompleteChange = (id, todos) => {
    const todoTarget = FindTodo(parseInt(id), todos);
    if (todoTarget == null) return;
    setData(todoTarget)
  }

  const handleDelete = (id, celengans) => {
    const todoTarget = FindTodoIndex(id, celengans);
    celengans.splice(todoTarget, 1)
    setCelengans([...celengans], celengans)
    navigate(-1)
  }

  const handleAdd = (e, id, celengans) => {
    e.preventDefault()
    const todoTarget = FindTodo(parseInt(id), celengans);
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if(parseInt(todoTarget.kurang) < parseInt(jumlah)){
      alert("Nominal tidak boleh melebihi kurang")
      return
    }
    let temp = {
      tanggal: time,
      jumlah: jumlah
    }
    todoTarget.terkumpul = parseInt(todoTarget.terkumpul) + parseInt(jumlah)
    if (parseInt(todoTarget.terkumpul) === parseInt(todoTarget.target)) {
      todoTarget.selesai = true
      alert("yayy terkumpul")
      navigate("/tercapai")
    }
    todoTarget.kurang = todoTarget.target - todoTarget.terkumpul
    todoTarget.progres = parseInt(todoTarget.terkumpul).toFixed() / parseInt(todoTarget.target).toFixed() * 100
    todoTarget.estimate = parseInt(todoTarget.kurang / todoTarget.nominal)
    todoTarget.data.push(temp)
    setData(todoTarget)
    setCelengans([...celengans], celengans)
    closeModal()
  }
  useEffect(() => {
    handleCompleteChange(id.id, celengans)

  }, [id.id, celengans])


  return (
    <>
      <div className='flex justify-center flex-col items-center text-gray-200 p-4'>
        <div className='flex flex-row justify-between w-full mb-4'>
          <button onClick={e => navigate(-1)}>Back</button>
          <button onClick={e => handleDelete(data.id, celengans)}>Delete</button>
        </div>
        <Card key={data.id} data={data} />
        <div className='flex text-left '>
          <div>
            <p>Dibuat  :</p>
          </div>
          <div>
            <p>{data.dibuat}</p>
          </div>
        </div>

        <div>
          <table className='bg-slate-500 rounded-lg shadow-md text-center align-baseline'>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold  uppercase "
                >
                  Terkumpul
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold  uppercase "
                >
                  Kurang
                </th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold  uppercase "
                >
                  {data?.terkumpul}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold  uppercase  "
                >
                  {data?.kurang}
                </th>

              </tr>


            </tbody>

          </table>

          <table>
            <thead>
              <tr>
                <th>

                </th>
                <th>
                  Riwayat
                </th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody>
              {
                data && data?.data?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        {data?.tanggal}
                      </th>
                      <th>
                        |
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        {data?.jumlah}
                      </th>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <button className='rounded-md shadow-md' onClick={openModal}>Tambah</button>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Tambah Uang
                    </Dialog.Title>
                    <div className="mt-2">
                      <form onSubmit={e => handleAdd(e, data.id, celengans)}>
                        <div className='flex space-x-2'>
                          <p>Jumlah</p>
                          <input onChange={(e) => setJumlah(e.target.value)} name='target' type='number' placeholder='Target Tabungan' required />
                        </div>
                      </form>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        
                      >
                        submit
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  )
}

export default Celengan