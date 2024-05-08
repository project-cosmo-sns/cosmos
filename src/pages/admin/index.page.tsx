import CertificateTable from './CertificateTable';

type TableBodyProps = {
  dataList: Data[];
};

export default function AdminPage({ dataList }: TableBodyProps) {
  return (
    <tbody>
      {dataList.map((data, index) => {
        const { id, name, generation, certificateIamge } = data; // 관리자페이지에서
        return (
          <CertificateTable
            key={id + index}
            name={name}
            generation={generation}
            certificateImage={certificateIamge}
          />
        );
      })}
    </tbody>
  );
}
